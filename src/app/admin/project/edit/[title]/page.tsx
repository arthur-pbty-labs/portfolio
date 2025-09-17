"use client";
import EditProjectForm from "@/components/EditProjectForm";

export default function EditProjectPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-8">Éditer le projet</h1>
      <EditProjectForm />
    </section>
  );
}