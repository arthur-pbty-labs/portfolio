import Image from "next/image";
import InfiniteScrollProjects from "@/components/InfiniteScrollProjects";
import { PrismaClient } from "@/generated/prisma";
import SidebarNav from "@/components/SidebarNav";

const prisma = new PrismaClient();

export default async function Home() {
	const rawProjects = await prisma.project.findMany();
	const projects = rawProjects.map((project: any) => ({
		title: project.title,
		desc: project.desc,
		img: project.img ?? null,
	}));

	return (
		<div className="min-h-screen bg-background text-foreground relative">
			<SidebarNav />
			<div id="accueil" className="font-sans flex items-center justify-center min-h-screen">
				<div className="mr-8">
					<h1 className="text-5xl font-bold mb-4">
						Puechberty
						<br />Arthur
					</h1>
					<h2 className="text-xl">Développeur Web | Sportif de haut niveau</h2>
				</div>
				<Image
					src="/avatar.png"
					alt="Photo de Arthur Puechberty"
					width={500}
					height={500}
					className="rounded-full"
					priority // Ajouté pour LCP
				/>
			</div>
			<div id="projets" className="p-8">
				<h3 className="text-2xl font-bold mb-4">My Projects</h3>
				{projects.length === 0 ? (
					<div className="text-center text-lg py-8">Aucun projet pour le moment</div>
				) : (
					<InfiniteScrollProjects projects={projects} repeat={7} />
				)}
			</div>
		</div>
	);
}
