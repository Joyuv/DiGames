from pydantic import BaseModel


class JsonJogoAdicionar(BaseModel):
    nome: str = ""
    status: str = ""
    generos: list[int] = []
    preco: float = 0.0
    descricao: str = ""

class JsonJogoAtualizar(JsonJogoAdicionar):
    preco: float =  -1.0

class JsonGeneroAdicionar(BaseModel):
    nome: str = ""
