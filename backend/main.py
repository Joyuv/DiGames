from typing import Union
from fastapi import FastAPI
from models.models import db, Jogo, Genero
from fastapi.middleware.cors import CORSMiddleware
from models.models import db, Jogo, Genero, engine, Base
from models.json import JsonJogoAtualizar, JsonJogoRemover, JsonJogoAdicionar
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

@app.get("/get/jogo/{jogo_id}")
async def get_jogo_info(jogo_id):
    info = db.get(Jogo, jogo_id)
    return({"jogo": info.to_dict()})

@app.get("/get/jogos")
def get_jogos():
    jogos = []
    for jogo in db.scalars(select(Jogo)):
        jogos.append(jogo.to_dict())
    
    return {"jogos": jogos}

@app.post("/update/jogo")
async def update_jogo(json: JsonJogoAtualizar):
    jogo = db.get(Jogo, json.id)

    if json.nome != jogo.nome and json.nome != "" and json.nome != None:
        jogo.nome = json.nome
    if json.status != jogo.status and json.status != "" and json.status != None:
        jogo.status = json.status

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
    jogo = Jogo(nome=str(json.nome), status=str(json.status), generos=generos)
    db.add(jogo)
    db.commit()
    return {
        "mensagem":"Jogo adicionado com sucesso!"
    }

#Rota de remover jogo

@app.post("/remove/jogo")
def remove_jogo(json: JsonJogoRemover):
    jogo = db.get(Jogo, json.id)
    db.delete(jogo)
    db.commit()
    return {
        "mensagem":f"Jogo removido nome: {jogo.nome}"
    }
    

#Rota de adicionar Gênero

@app.post("/add/genero")
def adicionar_jogo(json: JsonGeneroAdicionar):
    if json.status == None:
        json.status = "Disponível"
    genero = Genero(nome=str(json.genero), status=str(json.genero))
    db.add(genero)
    db.commit()
    return {
        "mensagem" : "Gênero adicionado"
    }

#Rota de remover Gênero

@app.post("/remove/jogo")
def remove_genero(json: JsonGeneroRemover):
    genero = db.get(Genero, json.id)
    db.delete(genero)
    db.commit()
    return {
        "mensagem" : f"Gênero removido nome {genero.nome}"
    }

