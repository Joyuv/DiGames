"use client";

import { useRouter } from "next/navigation";
import CardFormJogo from "../ui/CardFormJogo";
import useJogo from "@/hooks/jogo";
import { updateJogo } from "@/actions/jogo";
import Swal from "sweetalert2";

interface FormAtualizarJogoProps {
  id: string;
}

export default function FormAtualizarJogo({ id }: FormAtualizarJogoProps) {
  const router = useRouter();
  const jogo = useJogo(id);

  if (!jogo) return null;
  
  async function onSubmit(formData: FormData) {
    const data = {
      id: String(jogo?.id),
      nome: formData.get("nome") as string,
      preco: parseFloat((formData.get("preco") as string).replace(",", ".")),
      descricao: formData.get("descricao") as string,
      status: formData.get("status") as string,
      generos: JSON.parse(formData.get("generos") as string) as number[],
    };

    const newData = await updateJogo(
      data.id,
      data.nome,
      data.preco,
      data.descricao,
      data.status,
      data.generos,
    );

    Swal.fire({
      title: "Sucesso!",
      text: "Jogo atualizado com êxito",
      icon: "success",
    }).then(() =>router.push(`/`)); // mandar pra pagina do jogo quando tiver pronto na api
  }

  const precoFormated = String(jogo?.preco.toFixed(2)).replace(".", ",");

  const generosValue = jogo?.generos.map((genero) => {
    return {
      value: genero.id,
      label: genero.nome,
    };
  });

  return (
    <form action={onSubmit}>
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
