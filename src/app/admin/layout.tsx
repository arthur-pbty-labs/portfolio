export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
      {children}
    </main>
  );
}