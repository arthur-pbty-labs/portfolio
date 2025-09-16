"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="mb-8 px-4 py-2 bg-gray-900 text-white rounded font-semibold transition-colors duration-200 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none shadow"
      onClick={() => router.push("/#accueil")}
    >
      ← Retour à l’accueil
    </button>
  );
}