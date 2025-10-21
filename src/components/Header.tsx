// src/components/Header.tsx
import Link from "next/link";
import AramaCugubu from "./AramaCugubu";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo/Site Adı */}
        <Link href="/" className="text-3xl font-bold text-blue-600">
          Rehber
        </Link>
        
        {/* YENİ YAPI: Sağ Taraf (Favoriler + Arama) */}
        <div className="flex items-center gap-6">
          <Link 
            href="/favoriler" 
            className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Favorilerim
          </Link>
          
          <AramaCugubu />
        </div>

      </div>
    </header>
  );
}