"use client";
import { useRouter } from "next/navigation";

type UniversalBackButtonProps = {
  to?: string;
  label?: string;
  color?: "gray" | "blue";
  className?: string;
};

export default function UniversalBackButton({
  to = "/#accueil",
  label = "← Retour",
  color = "gray",
  className = "",
}: UniversalBackButtonProps) {
  const router = useRouter();
  const baseColor =
    color === "blue"
      ? "bg-blue-600 hover:bg-blue-700 focus:bg-blue-700"
      : "bg-gray-900 hover:bg-gray-700 focus:bg-gray-700";
  return (
    <button
      className={`mb-8 px-4 py-2 text-white rounded font-semibold transition-colors duration-200 focus:outline-none shadow ${baseColor} ${className}`}
      onClick={() => router.push(to)}
    >
      {label}
    </button>
  );
}