"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { WidgetCard } from "../WidgetCard";
import { PriceTag } from "@/components/data-display/PriceTag";
import { TrustBadge } from "@/components/data-display/TrustBadge";
import type { DailyMenuWithPlace } from "@/lib/types";

const COLLAPSED = 2;

const categoryLabels: Record<string, string> = {
  soup: "Polévka",
  main: "Hlavní jídlo",
  dessert: "Dezert",
  drink: "Nápoj",
  other: "Ostatní",
};

const categoryColors: Record<string, string> = {
  soup: "border-l-amber-300",
  main: "border-l-green-500",
  dessert: "border-l-amber-500",
  drink: "border-l-green-300",
  other: "border-l-gray-300",
};

export function DenniMenuWidget() {
  const [menus, setMenus] = useState<DailyMenuWithPlace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { getTodayMenus } = await import("@/lib/api/menus");
      const res = await getTodayMenus({ limit: 8 });
      setMenus((res as unknown as { data: DailyMenuWithPlace[] }).data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <WidgetCard
      title="Denní menu"
      icon="Utensils"
      href="/gastro/denni-menu"
      size="large"
      accent="green"
      loading={loading}
      expandable
      collapsedCount={COLLAPSED}
      totalCount={menus.length}
    >
      <div className="space-y-3">
        {menus.map((menu, idx) => {
          const placeName = menu.place?.name ?? "Restaurace";
          const placeSlug = menu.place?.slug;

          return (
            <div
              key={menu.place_id || idx}
              className={`bg-green-50/40 rounded-base p-3 ${idx >= COLLAPSED ? "hidden peer-[.expanded]:block" : ""}`}
            >
              <div className="flex items-center justify-between mb-2">
                <Link
                  href={placeSlug ? `/gastro/${placeSlug}` : "#"}
                  className="font-heading text-sm font-bold text-green-900 hover:text-green-700 transition-colors"
                >
                  {placeName}
                </Link>
                {menu.provenance && <TrustBadge provenance={menu.provenance} />}
              </div>
              <ul className="space-y-1.5">
                {menu.items.slice(0, 4).map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-baseline justify-between gap-2 text-sm pl-2 border-l-2 ${categoryColors[item.category] ?? "border-l-gray-200"}`}
                  >
                    <span className="text-gray-900 truncate">
                      <span className="text-xs text-gray-400 mr-1.5">
                        {categoryLabels[item.category] ?? ""}
                      </span>
                      {item.name}
                    </span>
                    <PriceTag price={item.price} className="flex-shrink-0 text-xs font-data font-bold text-amber-700" />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </WidgetCard>
  );
}
