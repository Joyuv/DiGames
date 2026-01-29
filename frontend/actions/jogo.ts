"use server"

import { GET_JOGOS_URL } from "@/routes/routes";
import axios from "axios";

export async function getJogos(id: string) {
    const result = await axios.get(GET_JOGOS_URL());
    console.log(result);
}