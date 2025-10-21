export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 md:p-12 lg:p-16 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-700">Tarif Yükleniyor...</p>
      </div>
    </main>
  );
}