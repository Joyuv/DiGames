"use client";

import { Jogo } from "@/types/jogo";
import Card from "./Card";
import { Key } from "react";
import { useRouter } from "next/navigation";

interface CardJogoProps {
  jogo: Jogo;
  key?: Key | undefined | null;
}

export default function CardJogo({ jogo, key }: CardJogoProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => {
        router.push(`/jogos/${jogo.id}`);
      }}
      extraClassNames="cursor-pointer"
      key={key}
    >
      <div
        className="
          h-50
          w-40 
          bg-linear-to-br from-slate-600 to-slate-700
          rounded
        "
      ></div>

      <div>
        {jogo.nome}
        {jogo.preco}
      </div>
    </Card>
  );
}
