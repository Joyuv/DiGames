"use client";

import { MenuContext } from "@/context/MenuContext";
import { CloudUpload, Home, SquarePlus } from "lucide-react";
import { useContext } from "react";
import SideMenuLink from "./SideMenuLink";

export default function SideMenu() {
  const { isOpen } = useContext(MenuContext);

  return(
    <aside
      className={`
        absolute right-0 
        flex
        h-full
        w-52
        transition-[width] duration-300 ease-in-out
        ${isOpen ? "": "close-menu"}
      `}
    >
      <div 
        className="
          flex-1 
          bg-linear-to-l from-slate-900 to-slate-800
          border-l border-slate-700
        "
      >
        <nav 
          className="
            flex flex-col gap-1
            p-2
          "
        >
          <SideMenuLink href="/">
            <Home/>
            Início
          </SideMenuLink>
          <SideMenuLink href="/jogos/publicar">
            <CloudUpload/>
            Publicar Jogo
          </SideMenuLink>
        </nav>
      </div>
    </aside>
  );
}