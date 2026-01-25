"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";

interface MenuProps {
  extraClassNames?: string;
}

export default function Menu({ extraClassNames }: MenuProps) {
  const { theme } = useTheme();

  return(
    <div className={`flex flex-col gap-1.5 w-6.5 h-8 justify-center transition-[width] duration-300 ${extraClassNames}`}>
      <div 
        className={clsx(
          "h-0.75 rounded",
          theme === "light" ? "bg-slate-400" : "bg-(--foreground)",
        )}
      >
      </div>
      <div 
        className={clsx(
          "h-0.75 rounded",
          theme === "light" ? "bg-slate-400" : "bg-(--foreground)",
        )}
      >
      </div>
      <div 
        className={clsx(
          "h-0.75 rounded",
          theme === "light" ? "bg-slate-400" : "bg-(--foreground)",
        )}
      >
      </div>
    </div>
  );
}