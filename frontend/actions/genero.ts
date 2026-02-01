"use server";

import { GET_GENEROS_URL } from "@/routes/routes";
import { ResponseGeneros } from "@/types/genero";
import axios from "axios";

export async function getGeneros() {
  try {
    const response = await axios.get<ResponseGeneros>(GET_GENEROS_URL());
    console.log("data");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
