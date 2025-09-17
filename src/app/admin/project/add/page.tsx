"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProjectPage() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, desc, img }),
    });
    router.push("/admin/project");
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-8">Ajouter un projet</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="border rounded px-4 py-2"
        />
        <textarea
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          required
          className="border rounded px-4 py-2"
        />
        <input
          type="text"
          placeholder="URL de l'image"
          value={img}
          onChange={e => setImg(e.target.value)}
          className="border rounded px-4 py-2"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold"
        >
          Ajouter
        </button>
      </form>
    </section>
  );
}