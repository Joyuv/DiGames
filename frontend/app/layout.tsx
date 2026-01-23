import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

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
    <html lang="pt-BR">
      <body
        className={`antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex flex-1 p-5">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
