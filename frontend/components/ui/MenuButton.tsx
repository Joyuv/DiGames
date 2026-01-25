"use client"

import { X } from "lucide-react";
import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import Menu from "./Menu";
import { MenuContext } from "@/context/MenuContext";
import clsx from "clsx";


export default function MenuButton() {
  const [ mounted, setMounted ] = useState(false);
  const { theme } = useTheme();
  const { isOpen, collapsed, toggleMenu } = useContext(MenuContext)

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return(
    <>
      <div id="toggle-menu" className="transition-transform duration-500 w-7 cursor-pointer" onClick={toggleMenu}>
        <div className={isOpen ? "block" : "hidden"}>
          <X 
            className="transition-transform duration-800"
            color={ theme === "dark" ? "var(--color-emphasis)": undefined} 
            size="2rem"
          />
        </div>
        <div className={isOpen ? "hidden" : "block"}>
          <Menu extraClassNames={clsx(
            collapsed ? "close-menu" : "",
            theme === "dark" ? "text-emphasis" : "",
          )} />
        </div>
      </div>
    </>
  );
}
