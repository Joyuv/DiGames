from sqlalchemy import String, create_engine, ForeignKey, Table, Column
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session, relationship
from typing import List, Optional

engine = create_engine("sqlite:///banco.db", echo=True)
db = Session(engine)

class Base(DeclarativeBase):
    pass

jogo_genero = Table(
    "jogo_genero",
    Base.metadata,
    Column("jogo_id", ForeignKey("jogos.id"), primary_key=True),
    Column("genero_id", ForeignKey("generos.id"), primary_key=True)
)

class Jogo(Base):
    __tablename__ = "jogos"

    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column()
    status: Mapped[str] = mapped_column()

    generos: Mapped[List["Genero"]] = relationship(secondary=jogo_genero, back_populates="jogos")

    def to_dict(self):
        generosnome = []
        for genero in self.generos:
            generosnome.append(genero.nome)
        return ({"id": self.id, "nome": self.nome, "status": self.status, "generos": generosnome})
    


class Genero(Base):
    __tablename__ = "generos"

    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column(unique=True)

    jogos: Mapped[Optional[List["Jogo"]]] = relationship(secondary=jogo_genero, back_populates="generos")