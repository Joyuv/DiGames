from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.models import db, Jogo
from models.json import JsonJogoAtualizar, JsonJogoRemover, JsonJogoAdicionar
from sqlalchemy import select

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

@app.get("/get/{jogo_id}")
async def get_jogo_info(jogo_id):
    info = db.get(Jogo, jogo_id)
    return({"jogo": info})

@app.get("/get/jogos")
def get_jogos():
    jogos = []
    for jogo in db.scalars(select(Jogo)):
        jogos.append(jogo)
    
    return({"jogos": jogos})

@app.post("/update/jogo")
async def update_jogo(json: JsonJogoAtualizar):
    jogo = db.get(Jogo, json.id)

    if json.nome != jogo.nome:
        jogo.nome = json.nome
    if json.status != jogo.status:
        jogo.status = json.status

    db.commit()

    return {"mensagem": "Jogo atualizado com sucesso!"}

@app.post("/add/jogo")
def add_jogo(json: JsonJogoAdicionar):
    if json.status == None:
        json.status = "Disponível"
    jogo = Jogo(nome=str(json.nome), status=str(json.status))
    db.add(jogo)
    db.commit()
    return {
        "mensagem":"Jogo adicionado com sucesso!"
    }

@app.post("/remove/jogo")
def remove_jogo(json: JsonJogoRemover):
    jogo = db.get(Jogo, json.id)
    db.delete(jogo)
    db.commit()
    return {
        "mensagem":f"Jogo removido nome: {jogo.nome}"
    }