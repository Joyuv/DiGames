"use client";

import { addJogo } from "@/actions/jogo";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import CardFormJogo from "../ui/CardFormJogo";

export default function FormPublicarJogo() {
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    // "use server";

    const data = {
      nome: formData.get("nome") as string,
      preco: parseFloat((formData.get("preco") as string).replace(",", ".")),
      descricao: formData.get("descricao") as string,
      status: formData.get("status") as string,
      generos: JSON.parse(formData.get("generos") as string) as number[],
    };

    const newData = await addJogo(
      data.nome,
      data.preco,
      data.descricao,
      data.status,
      data.generos,
    );

    Swal.fire({
      title: "Sucesso!",
      text: "Jogo publicado com êxito",
      icon: "success",
    }).then(() =>router.push(`/`)); // mandar pra pagina do jogo quando tiver pronto na api
  }

  return (
    <form action={onSubmit}>
      <CardFormJogo submitButtonText="Publicar Jogo"/>
    </form>
  );
}