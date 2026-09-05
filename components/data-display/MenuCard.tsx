import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PriceTag } from "./PriceTag";
import { TrustBadge } from "./TrustBadge";
import type { DailyMenuWithPlace } from "@/lib/types";

interface MenuCardProps {
  menu: DailyMenuWithPlace;
}

const categoryLabels: Record<string, string> = {
  soup: "Polévka",
  main: "Hlavní jídlo",
  dessert: "Dezert",
  drink: "Nápoj",
  other: "Ostatní",
};

export function MenuCard({ menu }: MenuCardProps) {
  const placeName = menu.place?.name ?? "Restaurace";
  const placeSlug = menu.place?.slug;

  return (
    <Card>
      <div className="flex items-start justify-between gap-2 mb-3">
        <Link
          href={placeSlug ? `/gastro/${placeSlug}` : "#"}
          className="font-heading font-semibold text-ink-900 hover:text-gold-700 transition-colors"
        >
          {placeName}
        </Link>
        <TrustBadge provenance={menu.provenance} />
      </div>
      <ul className="space-y-1.5">
        {menu.items.map((item, i) => (
          <li key={i} className="flex items-baseline justify-between gap-2">
            <div className="min-w-0">
              <span className="text-xs text-stone-500 mr-1.5">
                {categoryLabels[item.category] ?? ""}
              </span>
              <span className="text-sm text-ink-900">{item.name}</span>
            </div>
            <PriceTag price={item.price} className="flex-shrink-0 text-sm" />
          </li>
        ))}
      </ul>
    </Card>
  );
}
