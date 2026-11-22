import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { DemoBadge } from "@/components/ui/demo-badge";
import { cn } from "@/lib/cn";
import { APP_NAME } from "@/lib/app-name";

const AGES = ["3", "4", "5"] as const;
const ACTIVE_AGES = new Set(["4"]);

export default async function LeeducaPage() {
  const t = await getTranslations("Platform.screeningIndividual");
  const common = await getTranslations("Common");

  return (
    <div className="space-y-8">
      <section className="hero-gradient relative overflow-hidden rounded-3xl border border-border/70 p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
        />
        <div className="relative max-w-3xl space-y-3">
          <DemoBadge />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {APP_NAME}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
          <p className="max-w-3xl text-pretty text-base text-muted sm:text-lg">{t("intro")}</p>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">{t("ages")}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {AGES.map((age) => {
            const isActive = ACTIVE_AGES.has(age);
            const card = (
              <Card
                className={cn(
                  "flex flex-col items-center justify-center gap-2 py-8 text-center transition-all duration-200 sm:py-10",
                  isActive
                    ? "group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:shadow-[var(--shadow-glow)]"
                    : "cursor-not-allowed border-dashed opacity-55",
                )}
              >
                <p
                  className={cn(
                    "text-4xl font-bold tracking-tight sm:text-5xl",
                    isActive ? "text-accent" : "text-muted",
                  )}
                >
                  {age}
                </p>
                <p className="text-sm font-medium text-muted sm:text-base">
                  {common("ageYears", { age })}
                </p>
                {!isActive ? (
                  <span className="mt-1 rounded-full bg-surface-sunken px-2.5 py-0.5 text-xs font-medium text-muted">
                    {common("inDevelopment")}
                  </span>
                ) : null}
              </Card>
            );

            if (!isActive) {
              return (
                <div key={age} aria-disabled="true">
                  {card}
                </div>
              );
            }

            return (
              <Link key={age} href={`/leeduca/${age}`} className="group">
                {card}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Otros servicios</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/leeduca/seguimiento" className="group">
            <Card className="flex h-full flex-col gap-3 p-5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:shadow-[var(--shadow-glow)] sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A1.75 1.75 0 0 1 17 5.75v9.5A1.75 1.75 0 0 1 15.25 17H4.75A1.75 1.75 0 0 1 3 15.25v-9.5A1.75 1.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold">Seguimiento del alumnado</p>
                <p className="mt-1 text-sm text-muted">
                  Registra comentarios por alumno y consulta su agenda semanal.
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
