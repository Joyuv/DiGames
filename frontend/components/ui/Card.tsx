import { ComponentProps, ReactNode } from "react";

interface CardProps extends ComponentProps<"div">{
  children: ReactNode;
  flexDirection?: "row" | "column";
  extraClassNames?: string;
}

export default function Card({ flexDirection = "column", extraClassNames, children, ...props }: CardProps) {
  return(
    <div 
      {...props}
      className={`
        flex gap-3 ${flexDirection === "row" ? "flex-row" : "flex-col"}
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