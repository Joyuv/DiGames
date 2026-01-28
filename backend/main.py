from typing import Union
from fastapi import FastAPI
from models.models import db, Jogo, Genero
from fastapi.middleware.cors import CORSMiddleware
from models.models import db, Jogo, engine, Base
from models.json import JsonJogoAtualizar, JsonJogoRemover, JsonJogoAdicionar
from sqlalchemy import select

Base.metadata.create_all(engine)
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

#Rota de adicionar jogo

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

