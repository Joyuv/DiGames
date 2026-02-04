from fastapi import FastAPI, HTTPException
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

@app.get("/")
def read_index():
    return {"API Operante"}

@app.get("/get/jogo/{id}")
async def get_jogo_info(id):
    info = db.get(Jogo, id)
    if not info:
        raise HTTPException(status_code=404, detail="Jogo não encontrado")
    return({"jogo": info.to_dict()})

@app.get("/get/jogos")
def get_jogos():
    jogos = []
    for jogo in db.scalars(select(Jogo)):
        jogos.append(jogo.to_dict())
    
    return {"jogos": jogos}

@app.post("/update/jogo/{id}")
async def update_jogo(json: JsonJogoAtualizar, id: str):
    jogo = db.get(Jogo, id)

    print(json)

    if json.nome != jogo.nome and json.nome:
        jogo.nome = json.nome
    if json.status != jogo.status and json.status:
        jogo.status = json.status
    
    if json.generos != jogo.generos and json.generos:
        generos = []
        for genero_id in json.generos:
            genero = db.get(Genero, genero_id)
            generos.append(genero)
        jogo.generos = generos
    
    if json.preco >= 0 and json.preco != jogo.preco:
        jogo.preco = json.preco
    
    if json.descricao and json.descricao != jogo.descricao:
        jogo.descricao = json.descricao

    db.commit()

    return {"mensagem": "Jogo atualizado com sucesso!"}
  
#Rota de adicionar jogo

@app.post("/add/jogo")
def add_jogo(json: JsonJogoAdicionar):
    if json.status == None:
        json.status = "Disponível"
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
        "Jogo": jogo.to_dict()
    }

#Rota de remover jogo

@app.post("/remove/jogo/{id}")
def remove_jogo(id: int):
    jogo = db.get(Jogo, id)
    db.delete(jogo)
    db.commit()
    return {
        "mensagem":f"Jogo removido nome: {jogo.nome}"
    }
    

#Rota de adicionar Gênero

@app.post("/add/genero")
def add_genero(json: JsonGeneroAdicionar):
    genero = Genero(nome=str(json.genero))
    db.add(genero)
    db.commit()
    return {
        "mensagem" : "Gênero adicionado"
    }

#Rota de remover Gênero

@app.post("/remove/genero/{id}")
def remove_genero(id: int):
    genero = db.get(Genero, id)
    db.delete(genero)
    db.commit()
    return {
        "mensagem" : f"Gênero removido nome {genero.nome}"
    }

@app.get("/get/generos")
def get_generos():
    generos = []
    for genero in db.scalars(select(Genero)):
        generos.append(genero.to_dict())

    return {"generos": generos}

