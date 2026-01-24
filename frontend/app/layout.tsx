import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { ThemeProvider } from "@/components/providers/theme-provider";


export const metadata: Metadata = {
  title: "DiGames",
  description: "Divanilson Games, a melhor loja online de jogos. Concorrente direta da Steam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className="antialiased flex flex-col min-h-screen"
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <Header />
          <main className="flex flex-1 p-5">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
