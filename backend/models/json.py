from pydantic import BaseModel

class JsonJogoAtualizar(BaseModel):
    id: int = 1
    nome: str = ""
    status: str = ""
    generosadicionar: list[int] = []
    generosremover: list[int] = []

class JsonJogoAdicionar(BaseModel):
    nome: str = ""
    status: str = ""
    generos: list[int] = []

class JsonGeneroAdicionar(BaseModel):
    nome: str = ""
