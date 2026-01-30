import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  extraClassNames?: string;
}

export default function Card({ extraClassNames, children }: CardProps) {
  return(
    <div 
      className={`
        flex flex-col gap-3
        bg-slate-800 p-4
        rounded border border-slate-700
        shadow-md
        ${extraClassNames}
      `}
    >
      { children }
    </div>
  );
}