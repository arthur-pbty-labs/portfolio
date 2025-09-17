import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type EditProjectFormProps = {
  initialTitle?: string;
  initialDesc?: string;
  initialImg?: string;
};

export default function EditProjectForm({
  initialTitle = "",
  initialDesc = "",
  initialImg = "",
}: EditProjectFormProps) {
  const router = useRouter();
  const params = useParams();
  const [title, setTitle] = useState(initialTitle);
  const [desc, setDesc] = useState(initialDesc);
  const [img, setImg] = useState(initialImg);

  useEffect(() => {
    if (!initialTitle) {
      const decodedTitle = decodeURIComponent(params.title as string);
      fetch(`/api/project`)
        .then(res => res.json())
        .then(data => {
          const project = data.find((p: any) => p.title === decodedTitle);
          if (project) {
            setTitle(project.title);
            setDesc(project.desc);
            setImg(project.img || "");
          }
        });
    }
  }, [params.title, initialTitle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const decodedTitle = decodeURIComponent(params.title as string);
    await fetch(`/api/project/${encodeURIComponent(decodedTitle)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, desc, img }),
    });
    router.push("/admin/project");
  };

  return (
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
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
        >
          Enregistrer
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition font-semibold"
          onClick={() => router.push("/admin/project")}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}