import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";
import { MenuProvider } from "./MenuContext";

export default function Providers({ children }: { children: ReactNode }) {
  return(
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
    >
      <MenuProvider>
        {children}
      </MenuProvider>
    </ThemeProvider>
  );
}