"use client"; // Context ve localStorage tarayıcıda çalışır, bu yüzden "use client" şart.

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { YemekOzet } from '@/types'; // Yemek kartı için kullandığımız tipi alıyoruz

// 1. Context'in ne tür veri tutacağını tanımla
interface FavoritesContextType {
  favorites: YemekOzet[];
  addFavorite: (yemek: YemekOzet) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

// 2. Context'i oluştur
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// 3. "Provider" (Sağlayıcı) bileşeni oluştur. 
// Bu bileşen, tüm uygulamamızı saracak ve state'i yönetecek.
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<YemekOzet[]>([]);

  // Sayfa ilk yüklendiğinde, localStorage'dan eski favorileri çek
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Favoriler localStorage'dan okunurken hata:", error);
    }
  }, []); // [] -> Bu effect sadece 1 kez çalışır (component mount olduğunda)

  // 'favorites' state'i her değiştiğinde, localStorage'ı güncelle
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Favoriler localStorage'a yazılırken hata:", error);
    }
  }, [favorites]); // [favorites] -> Bu effect, 'favorites' dizisi değiştiğinde çalışır

  // Fonksiyonlar
  const addFavorite = (yemek: YemekOzet) => {
    setFavorites((prev) => [...prev, yemek]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((yemek) => yemek.idMeal !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some((yemek) => yemek.idMeal === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 4. Bu context'i kullanmak için özel bir hook oluştur.
// Bu, bileşenlerden state'e erişimi çok kolaylaştırır.
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites, FavoritesProvider içinde kullanılmalıdır');
  }
  return context;
}