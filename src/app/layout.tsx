import type { Metadata } from "next";
import { Poppins, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/contexts/gameContext";
import { CharacterProvider } from "@/contexts/characterContext";

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

export const metadata: Metadata = {
  title: "Pineappl for Myra",
  description: "A modern, post-AI introduction to programming.",
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
        className={`${poppins.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <GameProvider>
          <CharacterProvider>{children}</CharacterProvider>
        </GameProvider>
      </body>
    </html>
  );
}
