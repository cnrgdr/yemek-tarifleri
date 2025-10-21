// src/components/AramaCugubu.tsx
"use client"; // Client Component olarak işaretle

import { useState } from "react";
import { useRouter } from "next/navigation"; // App Router için 'next/navigation' kullanılır

export default function AramaCugubu() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
    if (!query.trim()) return; // Boş arama yapma
    
    // Kullanıcıyı arama sonuçları sayfasına yönlendir
    router.push(`/arama?q=${query}`);
    setQuery(""); // Arama çubuğunu temizle
  };

  return (
    <form onSubmit={handleSearch} className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Yemek ara (örn: Sushi)"
        className="px-4 py-2 border border-gray-300 rounded-l-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   text-gray-900" // Metin rengi eklendi
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-r-md 
                   hover:bg-blue-700 focus:outline-none"
      >
        Ara
      </button>
    </form>
  );
}