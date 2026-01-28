from pydantic import BaseModel

class JsonJogoAtualizar(BaseModel):
    id: int = 1
    nome: str = ""
    status: str = ""

class JsonJogoAdicionar(BaseModel):
    nome: str = ""
    status: str = ""
    generos: list = []

class JsonJogoRemover(BaseModel):
    id: int = 0