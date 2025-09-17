import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: Promise<{ title: string }> }) {
  const { title } = await params;
  const data = await req.json();
  const project = await prisma.project.update({
    where: { title },
    data,
  });
  return NextResponse.json(project);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ title: string }> }) {
  const { title } = await params;
  await prisma.project.delete({ where: { title } });
  return NextResponse.json({ ok: true });
}