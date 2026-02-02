"use client";

import { deleteJogo, getJogo } from "@/actions/jogo";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Jogo } from "@/types/jogo";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { title } from "process";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function JogoPage() {
  const router = useRouter();
  const params = useParams<{ id: string; }>();
  const [ jogo, setJogo ] = useState<Jogo | undefined>();

  useEffect(() => {
    async function fetchJogo() {
      const data = await getJogo(params.id);

      if (data?.jogo) {
        setJogo(data.jogo);
        return;
      }
      
      // modal de feedback falando que não encontrou o jogo
    }
    fetchJogo();
  }, []);

  async function handleDelete() {
    // modal de confirmação para deletar o jogo
    Swal.fire({
      title: "Deletar jogo",
      text: "Tem certeza que deseja deletar este jogo?",
      icon: "warning",
      confirmButtonText: "Sim",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      reverseButtons: true,

    }).then(async (result)=>{
      if (result.isConfirmed) {
        await deleteJogo(params.id);
        Swal.fire({
          title: "Sucesso!",
          text: "Jogo deletado com êxito",
          icon: "success",
        }).then(
          ()=>router.push("/")
        );
      }
    });
  }
  
  if (!jogo) return null;

  return(
    <div className="flex-1">
      <Card>
        <div className="flex flex-1">
          <div className="space-y-2">
            <div
              className="
                h-50
                w-40 
                bg-linear-to-br from-slate-600 to-slate-700
                rounded
              "
            >
            </div>
            <h2 className="text-xl text-emphasis">{jogo?.nome}</h2>
            <p>R$ {String(jogo?.preco).replace(".", ",")}</p>
            <p>{jogo?.status}</p>
          </div>

          <div className="flex-1">
            <p className="mx-5 break-all">
              {jogo?.descricao}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="space-x-3">
            {jogo?.generos.map((genero)=> (
              <span 
                className="bg-slate-700 border border-slate-600 rounded p-1"
                key={genero.id}
              >
                {genero.nome}
              </span>
            ))}
          </div>
          
          <div className="space-x-3">
            <Button>Editar</Button>
            <Button onClick={handleDelete}>Deletar</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}