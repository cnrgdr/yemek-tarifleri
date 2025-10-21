// src/types/index.ts

export interface Kategori {
  idCategory: string;
  strCategory: string; // "Beef"
  strCategoryThumb: string; // Resim linki
  strCategoryDescription: string; // Açıklama
}

export interface KategoriAPIResponse {
  categories: Kategori[];
}
export interface YemekOzet {
  strMeal: string; // Yemek adı
  strMealThumb: string; // Resim linki
  idMeal: string; // Yemek ID'si
}

export interface YemekAPIResponse {
  meals: YemekOzet[] | null; // API, sonuç bulamazsa 'null' dönebilir
}
type IndexSignature = {
  [key: string]: string | null;
};

// API'den gelen tam yemek detayı
export type YemekDetay = IndexSignature & {
  idMeal: string;
  strMeal: string; // Yemek adı
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string; // Yöre (Turkish, Italian...)
  strInstructions: string; // Tarif talimatları
  strMealThumb: string; // Resim
  strTags: string | null;
  strYoutube: string; // YouTube linki

  // Malzemeler (20 adet)
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;

  // Ölçüler (20 adet)
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;

  // Diğer alanlar...
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
};

// API yanıtı (bu kez 'meals' dizisi tek elemanlı olacak veya null)
export interface YemekDetayAPIResponse {
  meals: YemekDetay[] | null;
}