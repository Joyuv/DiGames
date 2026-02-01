"use client"

import useMounted from "@/hooks/isMounted";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";


export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const isMounted = useMounted();
  
  function toggleTheme() {
    const elemento = document.getElementById("toggle-theme");
    elemento?.classList.toggle("rotated");
    setTheme(theme === "dark" ? "light" : "dark");
  }

  if (!isMounted) return null;

  return(
    <>
      <div 
        id="toggle-theme" 
        className="
          cursor-pointer 
          transition-transform duration-600
        " 
        onClick={toggleTheme}
      >
        { theme === "dark" ? <Sun color="var(--color-emphasis)" size="2rem"/> : <Moon size="2rem"/>}
      </div>
    </>
  );
}