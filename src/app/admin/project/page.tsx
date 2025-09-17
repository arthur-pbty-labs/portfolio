"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminProjectPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/project")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (title: string) => {
    if (!confirm("Supprimer ce projet ?")) return;
    await fetch(`/api/project/${encodeURIComponent(title)}`, {
      method: "DELETE",
    });
    setProjects(projects.filter((p) => p.title !== title));
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-8 text-center">Liste des projets</h1>
      <Link
        href="/admin/project/add"
        className="mb-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold"
      >
        + Ajouter un projet
      </Link>
      {loading ? (
        <div className="text-lg">Chargement...</div>
      ) : projects.length === 0 ? (
        <div className="text-lg text-muted-foreground">Aucun projet trouvé.</div>
      ) : (
        <ul className="w-full max-w-2xl space-y-6">
          {projects.map((project) => (
            <li
              key={project.title}
              className="p-6 border rounded-xl bg-muted shadow flex flex-col gap-2"
            >
              <div className="flex items-center gap-4">
                {project.img && (
                  <img
                    src={project.img}
                    alt={project.title}
                    className="rounded w-20 h-20 object-cover border"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{project.title}</h2>
                  <p className="text-muted-foreground">{project.desc}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    title="Éditer"
                    className="p-2 rounded hover:bg-blue-100"
                    onClick={() => router.push(`/admin/project/edit/${encodeURIComponent(project.title)}`)}
                  >
                    <span role="img" aria-label="éditer">✏️</span>
                  </button>
                  <button
                    title="Supprimer"
                    className="p-2 rounded hover:bg-red-100"
                    onClick={() => handleDelete(project.title)}
                  >
                    <span role="img" aria-label="supprimer">❌</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link
        href="/admin"
        className="mt-8 px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition"
      >
        Retour admin
      </Link>
    </section>
  );
}