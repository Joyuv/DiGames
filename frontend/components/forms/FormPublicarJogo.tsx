"use client";

import { addJogo } from "@/actions/jogo";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import CardFormJogo from "../ui/CardFormJogo";
import { useState } from "react";

interface JogoFormPublicar {
  nome: string;
  preco: string;
  status: string;
  descricao: string;
}

export default function FormPublicarJogo() {
  const router = useRouter();
  const [jogo, setJogo] = useState<JogoFormPublicar>({
    nome: "",
    preco: "0,00",
    descricao: "",
    status: "",
  });

  async function onSubmit(formData: FormData) {
    // "use server";
    const rawData = {
      nome: formData.get("nome") as string,
      preco: formData.get("preco") as string,
      descricao: formData.get("descricao") as string,
      status: formData.get("status") as string,
      generos: formData.get("generos") as string,
    };

    const parsedData = {
      nome: rawData.nome,
      preco: parseFloat(rawData.preco.replace(",", ".")),
      descricao: rawData.descricao,
      status: rawData.status,
      generos: JSON.parse(rawData.generos) as number[],
    };

    setJogo({
      nome: rawData.nome,
      preco: rawData.preco,
      descricao: rawData.descricao,
      status: rawData.status,
    });

    if (parsedData.nome.length >= 3) {
      await addJogo(
        parsedData.nome,
        parsedData.preco,
        parsedData.descricao,
        parsedData.status,
        parsedData.generos,
      );

      Swal.fire({
        title: "Sucesso!",
        text: "Jogo publicado com êxito",
        icon: "success",
      }).then(() => router.push(`/`)); // mandar pra pagina do jogo quando tiver pronto na api
    } else {
      Swal.fire({
        title: "Erro",
        text: "O nome do jogo deve ter no mínimo 3 dígitos",
        icon: "error",
      });
    }
  }

  return (
    <form action={onSubmit}>
      <CardFormJogo
        nomeValue={jogo.nome}
        precoValue={jogo.preco}
        descricaoValue={jogo.descricao}
        statusValue={jogo.status}

        submitButtonText="Publicar Jogo"
      />
    </form>
  );
}
