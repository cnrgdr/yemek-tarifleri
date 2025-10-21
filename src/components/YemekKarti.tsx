// src/components/YemekKarti.tsx

import { YemekOzet } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface YemekKartiProps {
  yemek: YemekOzet;
}

export default function YemekKarti({ yemek }: YemekKartiProps) {
  return (
    <Link
      href={`/yemek/${yemek.idMeal}`} // Dinamik yemek ID'sine yönlendir
      key={yemek.idMeal}
      className="bg-white rounded-lg shadow-md overflow-hidden 
                 hover:shadow-xl transition-shadow duration-300 ease-in-out
                 group"
    >
      <div className="relative h-56 w-full">
        <Image
          src={yemek.strMealThumb}
          alt={yemek.strMeal}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-center text-gray-800 truncate">
          {yemek.strMeal}
        </h3>
      </div>
    </Link>
  );
}