"use client";

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50 p-8 md:p-12 lg:p-16 flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Bir Hata Oluştu!</h2>
        <p className="text-lg text-gray-700 mb-6">
          Yemekler yüklenirken beklenmedik bir sorun yaşandı.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-blue-600 text-white rounded-md 
                     hover:bg-blue-700 focus:outline-none"
        >
          Tekrar Dene
        </button>
      </div>
    </main>
  );
}