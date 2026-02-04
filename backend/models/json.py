from pydantic import BaseModel
from typing import Optional


class JsonJogoAdicionar(BaseModel):
    nome: str
    status: str
    generos: list[int]
    preco: float
    descricao: str

class JsonJogoAtualizar(BaseModel):
    nome: Optional[str] = None
    status: Optional[str] = None
    generos: Optional[list[int]] = None
    preco: Optional[float] = None
    descricao: Optional[str] = None

class JsonGeneroAdicionar(BaseModel):
    nome: str 
