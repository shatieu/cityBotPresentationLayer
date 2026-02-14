"use client";

import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { SearchBar } from "@/components/filters/SearchBar";
import { FilterChips } from "@/components/filters/FilterChips";
import { PlaceCard } from "@/components/data-display/PlaceCard";
import { MenuCard } from "@/components/data-display/MenuCard";
import type { PlaceSummary, DailyMenuWithPlace } from "@/lib/types";

const subcategories = [
  { value: "", label: "Vše" },
  { value: "restaurant", label: "Restaurace" },
  { value: "cafe", label: "Kavárny" },
  { value: "bar", label: "Bary" },
];

export default function GastroPage() {
  const [query, setQuery] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [places, setPlaces] = useState<PlaceSummary[]>([]);
  const [menus, setMenus] = useState<DailyMenuWithPlace[]>([]);

  useEffect(() => {
    async function load() {
      const { listPlaces } = await import("@/lib/api/places");
      const { getTodayMenus } = await import("@/lib/api/menus");

      const types = (subcategory || "restaurant") as import("@/lib/types").PlaceType;
      const [placesRes, menusRes] = await Promise.all([
        listPlaces({ type: types, q: query }),
        getTodayMenus({ limit: 6 }),
      ]);

      setPlaces(
        (placesRes as unknown as { data: PlaceSummary[] }).data ?? []
      );
      setMenus(
        (menusRes as unknown as { data: DailyMenuWithPlace[] }).data ?? []
      );
    }
    load();
  }, [query, subcategory]);

  return (
    <PageContainer className="py-6">
      <h1 className="font-heading text-2xl font-bold text-green-900 mb-4">
        Gastro
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Hledat restaurace, kavárny..."
        />
      </div>

      <FilterChips
        options={subcategories}
        value={subcategory}
        onChange={setSubcategory}
      />

      {/* Today's menus */}
      {menus.length > 0 && (
        <section className="mb-section mt-6">
          <SectionHeading title="Denní menu" seeAllHref="/gastro/denni-menu" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menus.map((menu, i) => (
              <MenuCard key={menu.place_id || i} menu={menu} />
            ))}
          </div>
        </section>
      )}

      {/* Place list */}
      <section className="mt-6">
        <SectionHeading title="Podniky" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} linkPrefix="/gastro" />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
