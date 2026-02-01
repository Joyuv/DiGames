export interface Jogo {
	id: number;
  nome: string;
  preco: number;
  descricao: string;
  status: string;
  generos: string[];
}

export interface ResponseJogos {
	jogos: Jogo[];
}