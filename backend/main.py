from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from models.models import db, Jogo, Genero
from fastapi.middleware.cors import CORSMiddleware
from models.models import db, Jogo, Genero, engine, Base
from models.json import JsonJogoAtualizar, JsonJogoAdicionar, JsonGeneroAdicionar, STATUS_PERMITIDOS
from sqlalchemy import select
from pydantic import ValidationError

Base.metadata.create_all(engine)
generos = [
    "Action", "Adventure", "RPG", "Strategy", "Simulation",
    "Sports", "Racing", "Fighting", "Shooter", "Puzzle",
    "Platformer", "Horror", "Survival", "Casual", "Party"
]
genero_check = db.get(Genero, 1)
if not genero_check:
    for genero in generos:
        db.add(Genero(nome=genero))
    db.commit()

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Handler para erros de validação do Pydantic
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    erros = []
    for erro in exc.errors():
        erros.append({
            "campo": ".".join(str(x) for x in erro["loc"][1:]),
            "mensagem": erro["msg"]
        })
    return JSONResponse(
        status_code=400,
        content={
            "sucesso": False,
            "erro": "Validação falhou",
            "detalhes": erros
        }
    )

  
# Rota de pegar dados de todos os jogos
@app.get("/jogos")
def get_jogos():
    jogos = []
    for jogo in db.scalars(select(Jogo)):
        jogos.append(jogo.to_dict())
    
    return {"jogos": jogos}
# Rota de pegar dados de um jogo específico
@app.get("/jogos/{id}")
async def get_jogo_info(id):
    info = db.get(Jogo, id)
    if not info:
        raise HTTPException(status_code=404, detail="Jogo não encontrado")
    return({"jogo": info.to_dict()})

# Rota de atualizar jogo
@app.put("/jogos/{id}")
async def update_jogo(json: JsonJogoAtualizar, id: str):
    try:
        jogo = db.get(Jogo, id)
        
        if not jogo:
            raise HTTPException(
                status_code=404,
                detail={
                    "sucesso": False,
                    "erro": "Jogo não encontrado"
                }
            )

        if json.nome and json.nome != jogo.nome:
            jogo.nome = json.nome
        if json.status and json.status != jogo.status:
            jogo.status = json.status
        
        if json.generos and json.generos != jogo.generos:
            generos = []
            for genero_id in json.generos:
                genero = db.get(Genero, genero_id)
                if not genero:
                    raise HTTPException(
                        status_code=400,
                        detail={
                            "sucesso": False,
                            "erro": "Validação falhou",
                            "detalhes": [{"campo": "generos", "mensagem": f"Gênero com ID {genero_id} não existe"}]
                        }
                    )
                generos.append(genero)
            jogo.generos = generos
        
        if json.preco >= 0 and json.preco != jogo.preco:
            jogo.preco = json.preco
        
        if json.descricao and json.descricao != jogo.descricao:
            jogo.descricao = json.descricao

        db.commit()

        return {
            "sucesso": True,
            "mensagem": "Jogo atualizado com sucesso!",
            "jogo": jogo.to_dict()
        }
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail={
                "sucesso": False,
                "erro": str(e)
            }
        )
  

# Rota de remover jogo
@app.post("/jogos")
def add_jogo(json: JsonJogoAdicionar):
    try:
        if json.status == None or json.status == "":
            json.status = "Disponível"
        
        generos = []
        for genero in json.generos:
            generoalt = db.get(Genero, genero)
            if not generoalt:
                raise HTTPException(
                    status_code=400,
                    detail={
                        "sucesso": False,
                        "erro": "Validação falhou",
                        "detalhes": [{"campo": "generos", "mensagem": f"Gênero com ID {genero} não existe"}]
                    }
                )
            generos.append(generoalt)
        
        if json.preco < 0:
            json.preco = 0
        
        jogo = Jogo(nome=str(json.nome), status=str(json.status), generos=generos, preco=json.preco, descricao=json.descricao)
        db.add(jogo)
        db.commit()
        return {
            "sucesso": True,
            "mensagem":"Jogo adicionado com sucesso!",
            "jogo": jogo.to_dict()
        }
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail={
                "sucesso": False,
                "erro": str(e)
            }
        )

#Rota de remover jogo

@app.delete("/jogos/{id}")
def remove_jogo(id: int):
    try:
        jogo = db.get(Jogo, id)
        if not jogo:
            raise HTTPException(
                status_code=404,
                detail={
                    "sucesso": False,
                    "erro": "Jogo não encontrado"
                }
            )
        db.delete(jogo)
        db.commit()
        return {
            "sucesso": True,
            "mensagem": f"Jogo removido com sucesso: {jogo.nome}"
        }
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail={
                "sucesso": False,
                "erro": str(e)
            }
        )
    
# Rota de pegar todos os gêneros
@app.get("/generos")
def get_generos():
    generos = []
    for genero in db.scalars(select(Genero)):
        generos.append(genero.to_dict())

    return {"generos": generos}

# Rota de adicionar Gênero
@app.post("/generos")
def add_genero(json: JsonGeneroAdicionar):
    try:
        if not json.nome or len(json.nome.strip()) < 3:
            raise HTTPException(
                status_code=400,
                detail={
                    "sucesso": False,
                    "erro": "Validação falhou",
                    "detalhes": [{"campo": "nome", "mensagem": "Nome do gênero deve ter no mínimo 3 caracteres"}]
                }
            )
        genero = Genero(nome=str(json.nome))
        db.add(genero)
        db.commit()
        return {
            "sucesso": True,
            "mensagem": "Gênero adicionado com sucesso!",
            "genero": genero.to_dict()
        }
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail={
                "sucesso": False,
                "erro": str(e)
            }
        )

# Rota de remover Gênero
@app.delete("/generos/{id}")
def remove_genero(id: int):
    try:
        genero = db.get(Genero, id)
        if not genero:
            raise HTTPException(
                status_code=404,
                detail={
                    "sucesso": False,
                    "erro": "Gênero não encontrado"
                }
            )
        db.delete(genero)
        db.commit()
        return {
            "sucesso": True,
            "mensagem": f"Gênero removido com sucesso: {genero.nome}"
        }
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail={
                "sucesso": False,
                "erro": str(e)
            }
        )

