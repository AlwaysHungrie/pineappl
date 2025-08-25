import type { Metadata } from "next";
import { Poppins, IBM_Plex_Mono, Anton } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/contexts/gameContext";
import { CharacterProvider } from "@/contexts/characterContext";
import { LevelContextProvider } from "@/contexts/levelContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Pineappl for Myra - A modern, post-AI introduction to programming.",
  description: "An introduction to programming in the modern, post-AI world.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${ibmPlexMono.variable} ${anton.variable} antialiased`}
      >
        <LevelContextProvider>
          <GameProvider>
            <CharacterProvider>{children}</CharacterProvider>
          </GameProvider>
        </LevelContextProvider>
      </body>
    </html>
  );
}
