import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

const ALLOWED_AGES = new Set(["4"]);

export default async function IndividualAgeRedirectPage({
  params,
}: {
  params: Promise<{ edad: string }>;
}) {
  const { edad } = await params;
  const locale = await getLocale();
  if (!ALLOWED_AGES.has(edad)) {
    redirect({ href: "/leeduca", locale });
  }
  redirect({ href: `/leeduca/${edad}`, locale });
}

