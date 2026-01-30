"use client"

import { X } from "lucide-react";
import { useTheme } from "next-themes";
import { useContext} from "react";
import Menu from "./MenuIcon";
import { MenuContext } from "@/context/MenuContext";
import useMounted from "@/hooks/isMounted";


export default function MenuButton() {
  const { theme } = useTheme();
  const { isOpen, collapsed, toggleMenu } = useContext(MenuContext);
  
  const isMounted = useMounted();

  if (!isMounted) return null;

  return(
    <div id="toggle-menu" className="transition-transform duration-500 w-7 cursor-pointer" onClick={toggleMenu}>
      <div className={isOpen ? "block" : "hidden"}>
        <X 
          className="transition-transform duration-800"
          color={ theme === "dark" ? "var(--color-emphasis)": undefined} 
          size="2rem"
        />
      </div>
      <div className={isOpen ? "hidden" : "block"}>
        <Menu extraClassNames={`
          ${collapsed ? "close-menu" : ""}
          ${theme === "dark" ? "text-emphasis" : ""}
        `} />
      </div>
    </div>
  );
}
