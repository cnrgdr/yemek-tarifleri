// src/app/yemek/[yemekID]/page.tsx

import { YemekDetayAPIResponse, YemekDetay, YemekOzet } from "@/types"; // YemekOzet'i import et
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FavoriButonu from "@/components/FavoriButonu"; // 1. YENİ BİLEŞENİ IMPORT ET

interface YemekDetayProps {
  params: {
    yemekID: string; 
  }
}


async function fetchYemekDetay(id: string): Promise<YemekDetay | null> {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  
  if (!res.ok) {
    throw new Error('Yemek detayı yüklenirken bir hata oluştu.');
  }
  
  const data: YemekDetayAPIResponse = await res.json();
  
  if (!data.meals || data.meals.length === 0) {
    return null;
  }
  
  return data.meals[0];
}


function formatMalzemeler(yemek: YemekDetay) {
  const malzemeler: { malzeme: string; olcu: string }[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const malzeme = yemek[`strIngredient${i}`];
    const olcu = yemek[`strMeasure${i}`];
    
    if (malzeme && malzeme.trim() !== "") {
      malzemeler.push({
        malzeme: malzeme,
        olcu: olcu && olcu.trim() !== "" ? olcu : "-",
      });
    }
  }
  return malzemeler;
}

// 4. Sayfa Bileşeni (Favori Butonu eklendi)
export default async function YemekDetaySayfasi({ params }: YemekDetayProps) {
  const yemek = await fetchYemekDetay(params.yemekID);

  if (!yemek) {
    notFound();
  }

  const malzemeler = formatMalzemeler(yemek);

  // 2. FAVORİ BUTONU İÇİN GEREKLİ 'ÖZET' NESNESİNİ OLUŞTUR
  const yemekOzet: YemekOzet = {
    idMeal: yemek.idMeal,
    strMeal: yemek.strMeal,
    strMealThumb: yemek.strMealThumb,
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-12 lg:p-16">
      
      <header className="mb-8">
        <Link
          href={`/kategori/${yemek.strCategory}`}
          className="text-blue-600 hover:underline mb-4 block"
        >
          &larr; {yemek.strCategory} Kategorisine Geri Dön
        </Link>
      </header>

      <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
          {yemek.strMeal}
        </h1>
        <p className="text-xl text-gray-600 mb-2"> {/* Boşluk ayarlandı (mb-6 -> mb-2) */}
          ({yemek.strArea} Mutfağı)
        </p>

        {/* 3. FAVORİ BUTONUNU EKLE */}
        <FavoriButonu yemek={yemekOzet} />

        {/* 2 Sütunlu Yapı (Değişiklik yok) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-6"> {/* Buton için 'mt-6' eklendi */}
          
          {/* Sol Sütun */}
          <div className="lg:col-span-1 space-y-6">
            <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-md">
              <Image
                src={yemek.strMealThumb}
                alt={yemek.strMeal}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2">
              Malzemeler
            </h2>
            <ul className="space-y-2">
              {malzemeler.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span className="font-medium text-gray-700">{item.malzeme}</span>
                  <span className="text-gray-600">{item.olcu}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sağ Sütun (Değişiklik yok) */}
          <div className="lg:col-span-2 space-y-6">
            {/* ... (Hazırlanışı ve Video kısmı aynı) ... */}
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2">
              Hazırlanışı
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {yemek.strInstructions}
            </p>
            {yemek.strYoutube && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                  Video Tarif
                </h2>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${yemek.strYoutube.split('=')[1]}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}