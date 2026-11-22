import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { APP_NAME } from "@/lib/app-name";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(900px_300px_at_20%_-10%,rgba(99,102,241,0.22),transparent_60%),radial-gradient(700px_260px_at_90%_0%,rgba(14,165,233,0.18),transparent_55%)]"
      />
      <header className="sticky top-0 z-40 border-b border-border/60 bg-surface/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/leeduca" className="group flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-sky-500 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-transform group-hover:scale-[1.03]">
              L
            </span>
            <span className="min-w-0">
              <p className="truncate text-base font-bold tracking-tight text-foreground sm:text-lg">
                {APP_NAME}
              </p>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                Preescolar · 3 a 5 años
              </p>
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
    </div>
  );
}
