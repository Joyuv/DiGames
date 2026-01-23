from sqlalchemy import String, create_engine, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session, relationship
from typing import List, Optional

engine = create_engine("sqlite:///banco.db", echo=True)
db = Session(engine)


class Base(DeclarativeBase):
    pass

class Jogo(Base):
    __tablename__ = "jogos"

    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column()
    genero_nome: Mapped[Optional[List[str]]] = mapped_column(ForeignKey("genero.nome"))
    status: Mapped[str] = mapped_column()

    genero: Mapped["Genero"] = relationship(back_populates="jogos")

    def to_dict(self):
        return ({"id": self.id, "nome": self.nome, "genero_nome": self.genero_nome, "status": self.status})

class Genero(Base):
    __tablename__ = "generos"

    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column(unique=True)

    jogos: Mapped[Optional[List["Jogo"]]] = relationship(back_populates="generos")