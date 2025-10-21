// src/app/page.tsx

import KategoriListesi from "@/components/KategoriListesi";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 md:p-12 lg:p-16">
      
      {/* Üst Başlık Alanı */}
      <header className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
          Rehber: Yemek Tarifleri
        </h1>
        <p className="mt-2 text-lg lg:text-xl text-gray-600">
          Dünyanın dört bir yanından lezzetleri keşfedin.
        </p>
      </header>

      {/* Kategori Bileşenimiz */}
  
      <KategoriListesi />
      
    </main>
  );
}