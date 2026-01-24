"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

// import { useState } from "react";


export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  
  function ChangeTheme() {
    const elemento = document.getElementById("toggle");
    elemento?.classList.toggle("rotated");

    if (theme === "dark"){
      setTheme("light");
    }
    else if (theme === "light"){
      setTheme("dark");
    }
  }

  return(
    <>
      <div id="toggle" className="cursor-pointer transition-transform duration-600" onClick={ChangeTheme}>
        { theme === "dark" ? <Sun size="2rem"/> : <Moon size="2rem"/>}
      </div>
    </>
  );
}