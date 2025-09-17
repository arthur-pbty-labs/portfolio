import Link from "next/link";
import UniversalBackButton from "@/components/UniversalBackButton";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
      <header className="w-full flex justify-start px-8 pt-8">
        <UniversalBackButton to="/" label="← Retour à l'accueil" color="blue" />
      </header>
      <main className="flex flex-col items-center justify-center flex-1 w-full">
        <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center max-w-md w-full">
          <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">
            Espace Admin
          </h1>
          <Link
            href="/admin/project"
            className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-semibold shadow transition"
          >
            Gérer les projets
          </Link>
        </div>
      </main>
    </div>
  );
}
