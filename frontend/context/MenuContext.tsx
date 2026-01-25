"use client";

import { createContext, ReactNode, useState } from "react";


type MenuContextType = {
  isOpen: boolean;
  collapsed: boolean;
  toggleMenu: () => void;
};

export const MenuContext = createContext<MenuContextType>(null!);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ collapsed, setCollapsed ] = useState(false);

  function toggleMenu() {
    if (!isOpen) {
      setCollapsed(true);
      setTimeout(() => {
        setIsOpen(true); 
      }, 300); 
    } else { 
      setIsOpen(false); 
      setCollapsed(true); 
      setTimeout(() => {
        setCollapsed(false);
      }, 0); 
    }
  }

  return (
    <MenuContext.Provider value={{ isOpen, collapsed, toggleMenu }}>
      { children }
    </MenuContext.Provider>
  );
}