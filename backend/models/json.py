from pydantic import BaseModel

class JsonJogoAtualizar(BaseModel):
    id: int
    nome: str
    status: str

class JsonJogoAdicionar(BaseModel):
    nome: str
    status: str

class JsonJogoRemover(BaseModel):
    id: int