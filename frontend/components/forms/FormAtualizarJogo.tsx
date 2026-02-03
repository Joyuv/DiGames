"use client";

import { useRouter } from "next/navigation";
import CardFormJogo from "../ui/CardFormJogo";
import useJogo from "@/hooks/jogo";

interface FormAtualizarJogoProps {
  id: string;
}

export default function FormAtualizarJogo({ id }: FormAtualizarJogoProps) {
  const router = useRouter();
  const jogo = useJogo(id);

  if (!jogo) return null;

  const precoFormated = String(jogo?.preco.toFixed(2)).replace(".", ",");

  const generosValue = jogo?.generos.map((genero) => {
    return {
      value: genero.id,
      label: genero.nome,
    };
  });

  return (
    <form>
      <CardFormJogo
        nomeValue={jogo?.nome}
        precoValue={precoFormated}
        descricaoValue={jogo?.descricao}
        statusValue={jogo?.status}
        generosValue={generosValue}
        submitButtonText="Atualizar"
      />
    </form>
  );
}
