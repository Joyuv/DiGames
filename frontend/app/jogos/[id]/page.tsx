"use client";

import { deleteJogo } from "@/actions/jogo";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import useJogo from "@/hooks/jogo";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function JogoPage() {
  const router = useRouter();
  const params = useParams<{ id: string; }>();
  const jogo = useJogo(params?.id);

  async function handleDelete() {
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
          <div className="space-y-5">
            <div
              className="
                h-50
                w-40 
                bg-linear-to-br from-slate-600 to-slate-700
                rounded
              "
            >
            </div>

            <div className="space-x-3">
              <Button onClick={()=>router.push(`/jogos/${params.id}/atualizar`)}>Editar</Button>
              <Button onClick={handleDelete}>Deletar</Button>
            </div>
          </div>

          <div className="flex flex-col flex-1 ml-5 gap-2">
            <h2 className="text-xl text-emphasis break-all">{jogo?.nome}</h2>
            
            <p>R$ {String(jogo?.preco).replace(".", ",")}</p>
            
            <p>{jogo?.status}</p>

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
          </div>
        </div>

        <hr />
        
        <div>
          <h3 className="text-xl text-emphasis">Descrição</h3>
          <p className="break-all">
            {jogo?.descricao}
          </p>
        </div>
      </Card>
    </div>
  );
}