import { getTranslations } from "next-intl/server";
import { Card } from "./card";

export async function PlaceholderPanel({ title }: { title: string }) {
  const t = await getTranslations("Common");
  return (
    <Card className="border-dashed border-border bg-surface-sunken/40">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted">{t("placeholder")}</p>
    </Card>
  );
}
