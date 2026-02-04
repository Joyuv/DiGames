from fastapi import FastAPI
from fastapi.responses import JSONResponse
from models.models import db, Jogo, Genero
from fastapi.middleware.cors import CORSMiddleware
from models.models import db, Jogo, Genero, engine, Base
from models.json import JsonJogoAtualizar, JsonJogoAdicionar, JsonGeneroAdicionar
from sqlalchemy import select

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

STATUS_PERMITIDOS = [
    "Disponível",
    "Indisponível",
    "Pré-venda",
]

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
        return JSONResponse({"mensagem": "Jogo não encontrado"}, status_code=404)
    return({"jogo": info.to_dict()})

# Rota de adicionar jogo
@app.post("/jogos")
def add_jogo(json: JsonJogoAdicionar):
    if json.status == None:
        json.status = "Disponível"
    if json.status not in STATUS_PERMITIDOS:
        return JSONResponse({"mensagem": f"Insira um status válido: {STATUS_PERMITIDOS}"}, status_code=400)
    
    generos = []
    for genero in json.generos:
        generoalt = db.get(Genero, genero)
        generos.append(generoalt)
    if json.preco < 0:
        json.preco = 0
    
    jogo = Jogo(nome=str(json.nome), status=str(json.status), generos=generos, preco=json.preco, descricao=json.descricao)
    db.add(jogo)
    db.commit()
    return {
        "mensagem":"Jogo adicionado com sucesso!",
        "jogo": jogo.to_dict()
    }

# Rota de atualizar jogo
@app.put("/jogos/{id}")
async def update_jogo(json: JsonJogoAtualizar, id: str):
    jogo = db.get(Jogo, id)

    if json.nome and len(json.nome) >= 3 and json.nome != jogo.nome:
        jogo.nome = json.nome
    if json.status and json.status != jogo.status:
        if json.status not in STATUS_PERMITIDOS:
            return JSONResponse({"mensagem": f"Insira um status válido: {STATUS_PERMITIDOS}"}, status_code=400)
        jogo.status = json.status
    
    if json.generos and json.generos != jogo.generos:
        generos = []
        for genero_id in json.generos:
            genero = db.get(Genero, genero_id)
            generos.append(genero)
        jogo.generos = generos
    
    if json.preco and json.preco >= 0 and json.preco != jogo.preco:
        jogo.preco = json.preco
    
    if json.descricao and json.descricao != jogo.descricao:
        jogo.descricao = json.descricao

    db.commit()

    return {"mensagem": "Jogo atualizado com sucesso!"}
  

# Rota de remover jogo
@app.delete("/jogos/{id}")
def remove_jogo(id: int):
    jogo = db.get(Jogo, id)
    db.delete(jogo)
    db.commit()
    return {
        "mensagem":f"Jogo removido nome: {jogo.nome}"
    }
    
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
    genero = Genero(nome=str(json.nome))
    db.add(genero)
    db.commit()
    return {
        "mensagem" : "Gênero adicionado"
    }

# Rota de remover Gênero
@app.delete("/generos/{id}")
def remove_genero(id: int):
    genero = db.get(Genero, id)
    db.delete(genero)
    db.commit()
    return {
        "mensagem" : f"Gênero removido nome {genero.nome}"
    }
