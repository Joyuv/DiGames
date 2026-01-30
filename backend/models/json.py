from pydantic import BaseModel

class JsonJogoAtualizar(BaseModel):
    nome: str = ""
    status: str = ""
    generosadicionar: list[int] = []
    generosremover: list[int] = []
    preco: float = -1.0
    descricao: str = ""

class JsonJogoAdicionar(BaseModel):
    nome: str = ""
    status: str = ""
    generos: list[int] = []
    preco: float = 0.0
    descricao: str = ""

class JsonGeneroAdicionar(BaseModel):
    nome: str = ""
