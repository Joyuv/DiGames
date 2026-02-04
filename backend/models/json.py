from pydantic import BaseModel, field_validator
from typing import Optional

STATUS_PERMITIDOS = ["Disponível", "Indisponível", "Pré-venda"]

class JsonJogoAdicionar(BaseModel):
    nome: str
    status: str
    generos: list[int]
    preco: float
    descricao: str

    @field_validator('nome', mode='before')
    @classmethod
    def validar_nome(cls, v):
        if not v or len(str(v).strip()) < 3:
            raise ValueError('Título deve ter no mínimo 3 caracteres')
        return str(v).strip()

    @field_validator('status')
    @classmethod
    def validar_status(cls, v):
        if v and v not in STATUS_PERMITIDOS:
            raise ValueError(f'Status inválido. Permitidos: {", ".join(STATUS_PERMITIDOS)}')
        return v

class JsonJogoAtualizar(BaseModel):
    nome: Optional[str]
    status: Optional[str]
    generos: Optional[list[int]] 
    preco: Optional[float]
    descricao: Optional[str]

    @field_validator('nome', mode='before')
    @classmethod
    def validar_nome_atualizar(cls, v):
        if v is not None and len(str(v).strip()) < 3:
            raise ValueError('Título deve ter no mínimo 3 caracteres')
        return str(v).strip() if v else None

class JsonGeneroAdicionar(BaseModel):
    nome: str

    @field_validator('nome', mode='before')
    @classmethod
    def validar_nome_genero(cls, v):
        if not v or len(str(v).strip()) < 3:
            raise ValueError('Nome do gênero deve ter no mínimo 3 caracteres')
        return str(v).strip()
