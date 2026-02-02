import { getJogos } from "@/actions/jogo";
import Card from "@/components/ui/Card";
import CardJogo from "@/components/ui/CardJogo";

export default async function Home() {
  const data = await getJogos();

  return (
    <section className="mx-auto">
      <div className="grid grid-cols-5 gap-10 ">
        { data?.jogos.map((jogo) =>  (
          <CardJogo key={jogo.id} jogo={jogo}/>
        ))}
      </div>
    </section>
  );
}
