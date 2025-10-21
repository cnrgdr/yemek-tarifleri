// src/app/arama/page.tsx

import { YemekAPIResponse } from "@/types";
import YemekKarti from "@/components/YemekKarti";

interface AramaSayfasiProps {
  searchParams: {
    q?: string; // URL'deki '?q=' parametresi ('?' opsiyonel demektir)
  }
}

// API'den arama sonuçlarını çek
async function fetchAramaSonuclari(query: string) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  if (!res.ok) {
    throw new Error("Arama sonuçları yüklenemedi");
  }
  const data: YemekAPIResponse = await res.json();
  return data.meals; // 'null' dönebilir eğer sonuç yoksa
}

export default async function AramaSayfasi({ searchParams }: AramaSayfasiProps) {
  const aramaTerimi = searchParams.q || ""; // URL'den arama terimini al
  const yemekler = aramaTerimi ? await fetchAramaSonuclari(aramaTerimi) : null;

  return (
    <div className="p-8 md:p-12 lg:p-16">
     <h1 className="text-4xl font-bold text-gray-800 mb-8">
  Arama Sonuçları: 
  <span className="text-blue-600 ml-2">&quot;{aramaTerimi}&quot;</span>
</h1>
      {/* API sonuç bulamazsa 'meals' dizisi 'null' döner.
        Bunu kontrol ediyoruz.
      */}
      {!yemekler ? (
        <p className="text-center text-xl text-gray-500">
          Bu terime uygun bir yemek bulunamadı.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {yemekler.map((yemek) => (
            <YemekKarti key={yemek.idMeal} yemek={yemek} />
          ))}
        </div>
      )}
    </div>
  );
}