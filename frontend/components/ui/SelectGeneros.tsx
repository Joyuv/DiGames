"use client";

import { getGeneros } from "@/actions/genero";
import useMounted from "@/hooks/isMounted";
import { GeneroOption } from "@/types/genero";
import { useEffect, useState } from "react";
import Select from "react-select";

interface SelectGenerosProps {
  generosDefault?: GeneroOption[];
}

export default function SelectGeneros({
  generosDefault = [],
}: SelectGenerosProps) {
  const [generosOptions, setGenerosOptions] = useState<GeneroOption[]>([]);
  const [selectedGeneros, setSelectedGeneros] =
    useState<GeneroOption[]>(generosDefault);
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
    <>
      <Select
        theme={(theme) => ({
          ...theme,
          outline: 0,
          colors: {
            ...theme.colors,
            primary25: "var(--color-slate-600)",
            primary: "var(--color-slate-600)",
            neutral0: "var(--color-slate-700)",
            neutral10: "var(--color-slate-600)",
            neutral80: "var(--color-neutral)",
            neutral20: "var(--color-slate-600)",
            neutral30: "",
            neutral40: "var(--color-indigo-500)",
            neutral50: "var(--color-neutral)",
            neutral60: "var(--color-slate-500)",
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
        value={selectedGeneros}
        onChange={(newValue) => setSelectedGeneros(newValue as GeneroOption[])}
        options={generosOptions}
        required
        className=""
      />
      <input
        type="hidden"
        name="generos"
        value={JSON.stringify(selectedGeneros.map((g) => g.value))}
      />
    </>
  );
}
