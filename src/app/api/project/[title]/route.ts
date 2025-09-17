import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: Promise<{ title: string }> }) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);
  const data = await req.json();
  const project = await prisma.project.update({
    where: { title: decodedTitle },
    data,
  });
  return NextResponse.json(project);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ title: string }> }) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);
  await prisma.project.delete({ where: { title: decodedTitle } });
  return NextResponse.json({ ok: true });
}