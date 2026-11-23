import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { preleoBlocks } from "./catalog";

export function ActivityMenu() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {preleoBlocks.map((block, index) => (
        <Card key={block.id} className="flex h-full flex-col gap-4 border-accent/15 bg-surface p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-sm font-bold text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">{block.title}</h2>
              <p className="text-sm text-muted">{block.subtitle}</p>
            </div>
          </div>

          <ul className="divide-y divide-border/70 overflow-hidden rounded-xl border border-border/70">
            {block.activities.map((activity) => (
              <li key={activity.id}>
                <Link
                  href={`/leeduca/4/actividades/${activity.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent-soft/60 hover:text-accent"
                >
                  <span>{activity.title}</span>
                  <span aria-hidden className="text-lg text-accent">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
