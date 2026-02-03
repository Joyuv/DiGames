import { getJogo } from "@/actions/jogo";
import { Jogo } from "@/types/jogo";
import { useEffect, useState } from "react";

export default function useJogo(id: string | number) {
  const [jogo, setJogo] = useState<Jogo | undefined>();

  useEffect(() => {
    async function fetchJogo() {
      const data = await getJogo(id);
      if (data?.jogo) {
        setJogo(data.jogo);
        return;
      }
    }
    fetchJogo();
  }, []);

  return jogo;
}
