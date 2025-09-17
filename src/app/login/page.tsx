"use client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-8">Vous êtes connecté</h1>
        <p className="mb-4">Bienvenue, {session.user?.name} !</p>
        <p className="mb-4">Email : {session.user?.email}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8">Connexion</h1>
      <button
        onClick={() => signIn("github")}
        className="bg-black text-white px-6 py-2 rounded mb-4"
      >
        Se connecter avec GitHub
      </button>
      <button
        onClick={() => signIn("google")}
        className="bg-red-500 text-white px-6 py-2 rounded"
      >
        Se connecter avec Google
      </button>
    </div>
  );
}