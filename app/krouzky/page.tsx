"use client";

import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SearchBar } from "@/components/filters/SearchBar";
import { FilterChips } from "@/components/filters/FilterChips";
import { ActivityCard } from "@/components/data-display/ActivityCard";
import type { ActivitySummary } from "@/lib/types";

const categoryFilters = [
  { value: "", label: "Vše" },
  { value: "dance", label: "Tanec" },
  { value: "sports", label: "Sport" },
  { value: "languages", label: "Jazyky" },
  { value: "art", label: "Výtvarno" },
  { value: "music", label: "Hudba" },
  { value: "crafts", label: "Řemesla" },
];

export default function KrouzkyPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [activities, setActivities] = useState<ActivitySummary[]>([]);

  useEffect(() => {
    async function load() {
      const { listActivities } = await import("@/lib/api/activities");
      const res = await listActivities({
        category: category || undefined,
        q: query || undefined,
      });
      setActivities(res);
    }
    load();
  }, [query, category]);

  return (
    <PageContainer className="py-6">
      <h1 className="font-heading text-2xl font-bold text-ink-900 mb-4">
        Kroužky a aktivity
      </h1>

      <div className="mb-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Hledat aktivitu..."
        />
      </div>

      <FilterChips
        options={categoryFilters}
        value={category}
        onChange={setCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </PageContainer>
  );
}
