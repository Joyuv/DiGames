"use client";

import { ComponentProps, FormEvent, HTMLInputTypeAttribute } from "react";

interface InputProps extends ComponentProps<"input"> {
  type?: HTMLInputTypeAttribute | "price";
}

function formatToPrice(
  event: FormEvent<HTMLInputElement>
) {
  const input = event.currentTarget;
  const numbersOnly = input.value.replace(/\D/g, "");

  if (!numbersOnly) return;

  const value = Number(numbersOnly) / 100;
  input.value = value.toFixed(2).replace(".", ",");
}

export default function Input({ type, ...props }: InputProps) {
  return (
    <input
      {...props}
      onInput={type === "price" ? formatToPrice : () => {}}
      className="
        outline-0
        rounded
        border border-slate-600 focus:border-indigo-500
        bg-slate-700
        px-2 py-1
        shadow-md
      "
    />
  );
}