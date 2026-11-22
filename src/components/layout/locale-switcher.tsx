"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Common");

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-border/70 bg-surface/70 p-1 shadow-sm backdrop-blur"
      aria-label={t("language")}
    >
      {(["es", "en"] as const).map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all",
            locale === loc
              ? "bg-accent text-on-accent shadow-sm"
              : "text-muted hover:bg-surface-sunken hover:text-foreground",
          )}
        >
          {loc}
        </Link>
      ))}
    </div>
  );
}
