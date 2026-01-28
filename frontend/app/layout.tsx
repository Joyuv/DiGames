import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Script from "next/script";
import SideMenu from "@/components/ui/SideMenu";
import Providers from "@/context/Providers";


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
      <head>
        <Script src="/scripts/preLoadDataTheme.js" strategy="beforeInteractive"/>
      </head>
      <body
        className="antialiased flex flex-col min-h-screen"
      >
        <Providers>
          <Header />
          <div className="flex flex-1 relative">
            <main className="flex flex-1 p-5">
              {children}
            </main>
            <SideMenu />
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
