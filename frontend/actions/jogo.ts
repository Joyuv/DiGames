"use server";

import axios, { AxiosResponse } from "axios";
import { GET_JOGOS_URL, POST_ADD_JOGO_URL } from "@/routes/routes";
import { ResponseJogos } from "@/types/jogo";

export async function getJogos() {
  try {
    const response = await axios.get<ResponseJogos>(GET_JOGOS_URL());
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addJogo(
  nome: string,
  preco: number,
  descricao: string,
  status: string,
	generos: number[],
) {
  try {
    const data = {
      nome: nome,
      preco: preco,
      descricao: descricao,
			status: status,
      generos: generos,
    };

    const response = await axios.post(POST_ADD_JOGO_URL(), data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
