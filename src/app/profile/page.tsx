"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg">Chargement...</span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-8">Profil</h1>
        <p className="mb-4">Vous devez être connecté pour voir votre profil.</p>
        <a
          href="/login"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Se connecter
        </a>
        <Link
          href="/"
          className="mt-4 px-6 py-2 bg-gray-200 text-foreground rounded hover:bg-gray-300"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="bg-muted rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Mon Profil</h1>
        <div className="mb-6">
          <Image
            src={user?.image || "/avatar.png"}
            alt={user?.name || "Avatar"}
            width={120}
            height={120}
            priority
            className="rounded-full border-2 border-blue-500"
          />
        </div>
        <div className="w-full mb-4">
          <div className="mb-2">
            <span className="font-semibold">Nom :</span>{" "}
            <span>{user?.name || "Non renseigné"}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Email :</span>{" "}
            <span>{user?.email || "Non renseigné"}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Provider :</span>{" "}
            <span>
              {session?.user?.email?.includes("gmail.com")
                ? "Google"
                : "GitHub"}
            </span>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4"
        >
          Déconnexion
        </button>
        <Link
          href="/"
          className="mt-4 px-6 py-2 bg-gray-200 text-foreground rounded hover:bg-gray-300"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}