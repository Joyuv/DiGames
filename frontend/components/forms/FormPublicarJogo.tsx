"use client";

import { addJogo } from "@/actions/jogo";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
import SelectGeneros from "../ui/SelectGeneros";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

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
      <Card extraClassNames="w-3xl">
        <div className="grid-cols-2 grid gap-3">
          <div className="grid col-span-2">
            <Label htmlFor="nome">Nome do Jogo</Label>
            <Input required name="nome" id="nome" />
          </div>

          <div className="grid">
            <Label htmlFor="preco">Preço (R$)</Label>
            <Input
              type="price"
              required
              name="preco"
              id="preco"
              defaultValue="0,00"
            />
          </div>

          <div className="grid">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue="" required name="status" id="status">
              <option value="" disabled>
                Selecione
              </option>
              <option value="Disponível">Disponível</option>
              <option value="Indisponível">Indisponível</option>
              <option value="Pré-venda">Pré-venda</option>
            </Select>
          </div>
        </div>

        <div className="grid">
          <Label htmlFor="descricao">Descrição</Label>
          <TextArea required rows={6} name="descricao" id="descricao" />
        </div>

        <div className="grid">
          <SelectGeneros/>
        </div>

        <Button type="submit">Enviar</Button>
      </Card>
    </form>
  );
}
