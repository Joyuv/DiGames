import { ComponentProps, ReactNode } from "react";

interface CardProps extends ComponentProps<"div">{
  children: ReactNode;
  extraClassNames?: string;
}

export default function Card({ extraClassNames, children, ...props }: CardProps) {
  return(
    <div 
      {...props}
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