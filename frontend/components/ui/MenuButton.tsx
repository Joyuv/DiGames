"use client"

import { X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Menu from "./Menu";


export default function MenuButton() {
  const { theme } = useTheme();
  const [ isOpen, setIsOpen ] = useState(false);
  const [ mounted, setMounted ] = useState(false);
  const [ collapsed, setCollapsed ] = useState(false);

  function toggleMenu() {
    if (!isOpen) { // ABRINDO
      setCollapsed(true); // aplica close-menu na barra
      setTimeout(() => {
        setIsOpen(true); // troca para X
      }, 300); // sincronize com seu CSS
    } else { // FECHANDO
      setIsOpen(false); // volta a mostrar a barra
      setCollapsed(true); // barra inicia fechada
      setTimeout(() => {
        setCollapsed(false); // remove close-menu para crescer
      }, 0); // próximo tick
    }
  }

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) return null;

  return(
    <>
      <div id="toggle-menu" className="transition-transform duration-500 w-7 cursor-pointer" onClick={toggleMenu}>
        {/* {String(isOpen)} */}
        <div className={isOpen ? "block" : "hidden"}>
          <X 
            className="transition-transform duration-800"
            color={ theme === "light" ? "var(--color-violet-400)": undefined} 
            size="2rem"
          />
        </div>
        <div className={isOpen ? "hidden" : "block"}>
          <Menu extraClassNames={collapsed ? "close-menu" : ""} />
        </div>
      </div>
    </>
  );
}
