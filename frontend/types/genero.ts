export interface Genero {
	id: number;
	nome: string;
}

export interface GeneroOption {
  value: Genero["id"];
  label: Genero["nome"];
}

export interface ResponseGeneros {
	generos: Genero[];
}
