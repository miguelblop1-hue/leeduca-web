import { getTranslations } from "next-intl/server";

export async function DemoBadge() {
  const t = await getTranslations("Common");
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {t("demoBadge")}
    </span>
  );
}
