// src/app/kategori/[kategoriAdi]/page.tsx

import { YemekAPIResponse, YemekOzet } from "@/types";
import Image from "next/image";
import Link from "next/link"; // Geri dönmek için
import YemekKarti from "@/components/YemekKarti";

// 1. Sayfanın alacağı 'props' (parametreler)
interface KategoriDetayProps {
  params: {
    kategoriAdi: string; // Bu isim, klasör adıyla ([kategoriAdi]) aynı olmalı
  }
}

// 2. Veri Çekme Fonksiyonu
async function fetchYemekler(kategori: string) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${kategori}`);
  
  if (!res.ok) {
    throw new Error('Yemekler yüklenirken bir hata oluştu.');
  }
  
  const data: YemekAPIResponse = await res.json();
  return data.meals;
}

// 3. Sayfa Bileşeni (Server Component)
export default async function KategoriDetaySayfasi({ params }: KategoriDetayProps) {
  const kategoriAdi = params.kategoriAdi;
  const yemekler = await fetchYemekler(kategoriAdi);

  return (
    <main className="min-h-screen bg-gray-50 p-8 md:p-12 lg:p-16">
      
      {/* Geri Dön Linki ve Başlık */}
      <header className="mb-12">
        <Link href="/" className="text-blue-600 hover:underline mb-4 block">
          &larr; Tüm Kategorilere Geri Dön
        </Link>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
          {decodeURIComponent(kategoriAdi)} {/* 'Side' gibi kategoriler için */}
        </h1>
        <p className="mt-2 text-lg lg:text-xl text-gray-600">
          Bu kategorideki lezzetler
        </p>
      </header>

      {/* --- DÜZENLENEN YEMEK LİSTESİ BÖLÜMÜ --- */}
      {!yemekler ? (
        // API 'null' dönerse (örn: geçersiz kategori)
        <p className="text-center text-xl text-gray-500">
          Bu kategoride henüz yemek bulunamadı.
        </p>
      ) : (
        // 1. Grid (ızgara) yapısını geri ekliyoruz
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* 2. 'map' fonksiyonunu geri ekliyoruz */}
         {yemekler.map((yemek) => (
            <YemekKarti key={yemek.idMeal} yemek={yemek} />
          ))}

        </div> // grid div'ini burada kapatıyoruz
      )}
      
    </main>
  );
}