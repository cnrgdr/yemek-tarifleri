// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { FavoritesProvider } from "@/context/FavoritesContext"; // 1. IMPORT EDİLMİŞ OLMALI

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rehber: Yemek Tarifleri",
  description: "Dünyanın dört bir yanından lezzetler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-gray-50`}>
        
        {/* 2. TÜM UYGULAMA BUNUNLA SARMALANMIŞ OLMALI */}
        <FavoritesProvider> 
          
          <Header /> 
          
          <main>
            {children}
          </main>
          
        </FavoritesProvider> 
        
      </body>
    </html>
  );
}