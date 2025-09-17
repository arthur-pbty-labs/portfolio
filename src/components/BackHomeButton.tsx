"use client";
import { useRouter } from "next/navigation";

export default function BackHomeButton() {
  const router = useRouter();
  return (
    <button
      className="mb-8 px-4 py-2 bg-blue-600 text-white rounded font-semibold transition-colors duration-200 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none shadow"
      onClick={() => router.push("/")}
    >
      ← Retour à l'accueil
    </button>
  );
}