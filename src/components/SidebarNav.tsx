"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react"; // Retirer signOut

const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "arthur.puechberty@outlook.com";

export default function SidebarNav() {
	const [navOpen, setNavOpen] = useState(false);
	const { data: session, status } = useSession();

	return (
		<>
			<button
				className="fixed top-8 left-8 z-50 bg-background text-foreground rounded-2xl w-12 h-12 flex items-center justify-center shadow-2xl border border-muted hover:bg-muted transition"
				onClick={() => setNavOpen(!navOpen)}
				aria-label={navOpen ? "Fermer la navigation" : "Ouvrir la navigation"}
			>
				{navOpen ? (
					<span className="text-2xl font-bold text-foreground">✕</span>
				) : (
					<span className="flex flex-col gap-1">
						<span className="block w-6 h-0.5 bg-foreground"></span>
						<span className="block w-6 h-0.5 bg-foreground"></span>
						<span className="block w-6 h-0.5 bg-foreground"></span>
					</span>
				)}
			</button>
			<div
				className={`fixed top-8 left-8 z-40 transition-all duration-500 ${
					navOpen
						? "opacity-100 h-[80vh] w-56"
						: "opacity-0 h-12 w-12 pointer-events-none"
				}`}
				style={{ overflow: "hidden" }}
			>
				<nav className="bg-background text-foreground flex flex-col p-8 shadow-2xl rounded-2xl border border-muted h-full w-full">
					{navOpen && (
						<>
							<a href="#accueil" className="mb-4 mt-6 hover:underline">
								Accueil
							</a>
							<a href="#projets" className="mb-4 hover:underline">
								Projets
							</a>
							<a href="#contact" className="mb-4 hover:underline">
								Contact
							</a>
							{status === "loading" ? (
								<span className="block py-2 px-4">Chargement...</span>
							) : session ? (
								<>
									<Link
										href="/profile"
										className="block py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 mb-2"
									>
										Profil
									</Link>
									{session.user?.email === adminEmail && (
										<Link
											href="/admin"
											className="block py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600 mb-2"
										>
											Admin
										</Link>
									)}
								</>
							) : (
								<Link
									href="/login"
									className="block py-2 px-4 hover:bg-gray-200 rounded"
								>
									Connexion
								</Link>
							)}
						</>
					)}
				</nav>
			</div>
		</>
	);
}