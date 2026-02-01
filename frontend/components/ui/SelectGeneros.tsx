"use client";

import { getGeneros } from "@/actions/genero";
import useMounted from "@/hooks/isMounted";
import { Genero } from "@/types/genero";
import { useEffect, useState } from "react";
import Select from "react-select";

interface GeneroOption {
  value: number;
  label: string;
}

export default function SelectGeneros() {
  const [generosOptions, setGenerosOptions] = useState<GeneroOption[]>([]);
  const isMounted = useMounted();

  useEffect(() => {
    async function fetchGeneros() {
      try {
        const data = await getGeneros();
        const options =
          data?.generos.map((genero) => ({
            value: genero.id,
            label: genero.nome,
          })) || [];
        setGenerosOptions(options);
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    }
    fetchGeneros();
  }, []);

  if (!isMounted) return null;

  return (
    <Select
      theme={(theme) => ({
        ...theme,
        outline: 0,
        colors: {
          ...theme.colors,
          primary25: "var(--color-slate-600)",
          primary: "var(--color-slate-600)",
          neutral0: "var(--color-slate-700)",
          neutral10: "var(--color-slate-600)", // background da opção selecionada
          neutral80: "var(--color-neutral)", // fonte da opção selecionada
          // neutral5: "pink",
          neutral20: "var(--color-slate-600)", // borda do select, barrinha vertical, X e Seta
          neutral30: "", // hover da borda do select
          neutral40: "var(--color-indigo-500)", // hover dos botões
          neutral50: "var(--color-neutral)", // cor da fonte do texto Select...
          neutral60: "var(--color-slate-500)", // foco de X e Seta
          // neutral70: "yellow",
          // neutral90: "blue",
          danger: "var(--color-indigo-500)",
          dangerLight: "var(--color-indigo-400)",
        },
      })}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          boxShadow: "none",
          borderColor: state.isFocused
            ? "var(--color-indigo-500)"
            : "var(--color-slate-600)",
        }),
      }}
      isMulti
      name="generos"
      options={generosOptions}
      required
      className=""
      // classNamePrefix="select"
    />
  );
}
