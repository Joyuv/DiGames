"use server";

import axios from "axios";
import { DELETE_JOGO_URL, GET_JOGO_URL, GET_JOGOS_URL, POST_ADD_JOGO_URL, PUT_JOGO_URL } from "@/routes/routes";
import { ResponseDeleteJogo, ResponseJogo, ResponseJogos } from "@/types/jogo";

export async function getJogos() {
  try {
    const response = await axios.get<ResponseJogos>(GET_JOGOS_URL());
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getJogo(id: string | number) {
  try {
    const response = await axios.get<ResponseJogo>(GET_JOGO_URL(id));
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function deleteJogo(id: string | number) {
  try {
    const response = await axios.delete<ResponseDeleteJogo>(DELETE_JOGO_URL(id));
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

export async function updateJogo(
  id: string | number,
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

    const response = await axios.put(PUT_JOGO_URL(id), data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
