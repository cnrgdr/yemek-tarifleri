// src/components/KategoriListesi.tsx

import { Kategori, KategoriAPIResponse } from "@/types";
import Image from "next/image"; // Next.js'in optimize edilmiş resim bileşeni
import Link from 'next/link';

// API'den kategorileri çekecek fonksiyon
async function fetchKategoriler() {
  // await gecikme ekleyerek yükleme ekranını (loading) daha sonra test edebiliriz
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  
  if (!res.ok) {
    throw new Error('Kategoriler yüklenirken bir hata oluştu.');
  }
  
  const data: KategoriAPIResponse = await res.json();
  return data.categories;
}

// Ana Bileşen (Bu bir Server Component)
export default async function KategoriListesi() {
  const kategoriler = await fetchKategoriler();

return (
    <section className="mt-12">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">Kategoriler</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        
        {kategoriler.map((kategori) => (
          <Link 
            href={`/kategori/${kategori.strCategory}`} // Dinamik adrese yönlendir
            key={kategori.idCategory}
            className="bg-white rounded-lg shadow-md overflow-hidden 
                       hover:shadow-xl transition-shadow duration-300 ease-in-out
                       cursor-pointer group"
          >
            <div className="relative h-40 w-full">
              <Image
                src={kategori.strCategoryThumb}
                alt={kategori.strCategory}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">
                {kategori.strCategory}
              </h3>
            </div>
          </Link> // Link'i burada kapat
        ))}
        
      </div>
    </section>
  );
}