import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DemoBadge } from "@/components/ui/demo-badge";
import { PlaceholderPanel } from "@/components/ui/placeholder-panel";

const labels: Record<string, string> = {
  intensificacion: "intensificacion",
  repaso: "repaso",
  paleta: "paleta",
};

export default async function PreleoProgramPage({
  params,
}: {
  params: Promise<{ programa: string }>;
}) {
  const { programa } = await params;
  const t = await getTranslations("Platform.preleo");
  const page = await getTranslations("Platform.programPage");
  const common = await getTranslations("Common");
  const key = labels[programa] ?? "intensificacion";
  const programName = t(`programs.${key}`);

  return (
    <div className="space-y-8">
      <section className="hero-gradient relative overflow-hidden rounded-3xl border border-border/70 p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="relative max-w-3xl space-y-3">
          <DemoBadge />
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-strong">
            ← {common("backToPlatform")}
          </Link>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {page("title", { program: programName })}
          </h1>
          <p className="max-w-3xl text-pretty text-base text-muted sm:text-lg">{page("intro")}</p>
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-3">
        <PlaceholderPanel title={page("blocks.objectives")} />
        <PlaceholderPanel title={page("blocks.sessions")} />
        <PlaceholderPanel title={page("blocks.tracking")} />
      </div>
    </div>
  );
}
