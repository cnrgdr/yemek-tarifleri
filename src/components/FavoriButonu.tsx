// src/components/FavoriButonu.tsx
"use client";

import { useState, useEffect } from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import { YemekOzet } from '@/types'; // Favori listemizin kullandığı tip

// Bu bileşen, favoriye eklenecek yemeğin özet bilgisini prop olarak alır
interface FavoriButonuProps {
  yemek: YemekOzet; 
}

export default function FavoriButonu({ yemek }: FavoriButonuProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  // Bu yemeğin favori olup olmadığını tutan yerel bir state.
  // Bu state, sunucu ve istemci arasındaki 'hydration' hatasını önler.
  const [isFav, setIsFav] = useState(false);

  // Bileşen yüklendiğinde (veya 'yemek' prop'u değiştiğinde)
  // Context'teki (yani localStorage'daki) 'isFavorite' fonksiyonunu kullanarak
  // bu yemeğin favori olup olmadığını kontrol et ve yerel state'i güncelle.
  useEffect(() => {
    setIsFav(isFavorite(yemek.idMeal));
  }, [isFavorite, yemek.idMeal]); // Bağımlılıklar: Bu ikisi değişirse effect tekrar çalışır.

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFavorite(yemek.idMeal);
      setIsFav(false);
    } else {
      // addFavorite, YemekOzet tipinde bir nesne bekliyordu.
      addFavorite(yemek);
      setIsFav(true);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`mt-4 px-6 py-2 rounded-md font-semibold text-white transition-colors duration-200
        ${isFav 
          ? 'bg-red-600 hover:bg-red-700' 
          : 'bg-green-600 hover:bg-green-700'
        }
      `}
    >
      {isFav ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
    </button>
  );
}