"use client"; // localStorage'a erişim için Client Component olmalı

import { useFavorites } from "@/context/FavoritesContext";
import YemekKarti from "@/components/YemekKarti"; // Yemek kartı bileşenimizi yeniden kullanacağız

export default function FavorilerSayfasi() {
  // Context'imizden favori listesini çekiyoruz
  // Context, localStorage'dan yüklemeyi zaten kendi içinde hallediyor
  const { favorites } = useFavorites();

  return (
    <div className="p-8 md:p-12 lg:p-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Favori Tariflerim
      </h1>

      {/* Favori listesi boş mu diye kontrol et */}
      {favorites.length === 0 ? (
        <p className="text-center text-xl text-gray-500">
          Henüz hiç favori yemek eklemediniz.
        </p>
      ) : (
        // Boş değilse, kartları grid yapısında göster
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((yemek) => (
            <YemekKarti key={yemek.idMeal} yemek={yemek} />
          ))}
        </div>
      )}
    </div>
  );
}