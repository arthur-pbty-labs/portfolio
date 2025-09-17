import { notFound } from "next/navigation";
import { PrismaClient } from "@/generated/prisma";
import Image from "next/image";
import UniversalBackButton from "@/components/UniversalBackButton";

const prisma = new PrismaClient();

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

type Props = {
  params: { slug: string };
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projects = await prisma.project.findMany();
  const project = projects.find((p) => slugify(p.title) === slug);
  if (!project) return notFound();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
      <UniversalBackButton to="/#accueil" label="← Retour à l’accueil" color="gray" />
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      {project.img && (
        <Image
          src={project.img}
          alt={project.title}
          width={400}
          height={400}
          className="rounded-xl mb-6"
        />
      )}
      <p className="text-lg">{project.desc}</p>
    </div>
  );
}