from typing import Union
from fastapi import FastAPI
from models.models import db, Jogo
from fastapi.middleware.cors import CORSMiddleware
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





