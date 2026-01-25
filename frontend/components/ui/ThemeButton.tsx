"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  // v evitar hydratation warning ao atualizar página v
  const [ mounted, setMounted ] = useState(false); 
  // ^ evitar hydratation warning ao atualizar página ^
  
  function ChangeTheme() {
    const elemento = document.getElementById("toggle-theme");
    elemento?.classList.toggle("rotated");
    setTheme(theme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) return null;

  return(
    <>
      <div 
        id="toggle-theme" 
        className="
          cursor-pointer 
          transition-transform duration-600
        " 
        onClick={ChangeTheme}
      >
        { theme === "dark" ? <Sun size="2rem"/> : <Moon color="var(--color-violet-400)" size="2rem"/>}
      </div>
    </>
  );
}