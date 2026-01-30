import { ComponentProps } from "react";



export default function Input({ ...props }: ComponentProps<"input">) {
  return(
    <input {...props} 
      className="
        outline-0
        rounded
        border border-slate-600 focus:border-current
        bg-slate-700
        px-2 py-1
        mb-3
      "
    />
  );
}