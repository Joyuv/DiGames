import { Genero } from "./genero";

export interface Jogo {
	id: number;
  nome: string;
  preco: number;
  descricao: string;
  status: string;
  generos: Genero[];
}

export interface ResponseJogo {
  jogo: Jogo;
}

export interface ResponseJogos {
	jogos: Jogo[];
}