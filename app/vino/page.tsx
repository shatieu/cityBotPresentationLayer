"use client";

import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { FilterChips } from "@/components/filters/FilterChips";
import { WineryCard } from "@/components/data-display/WineryCard";
import type { WinerySummary } from "@/lib/types";

const filters = [
  { value: "", label: "Všechna vinařství" },
  { value: "open", label: "Otevřeno dnes" },
  { value: "tastings", label: "S degustací" },
];

export default function VinoPage() {
  const [filter, setFilter] = useState("");
  const [wineries, setWineries] = useState<WinerySummary[]>([]);

  useEffect(() => {
    async function load() {
      const { listWineries } = await import("@/lib/api/wineries");
      const params: Record<string, string> = {};
      if (filter === "open") params.open_today = "true";
      const res = await listWineries(params);
      setWineries((res as unknown as { data: WinerySummary[] }).data ?? []);
    }
    load();
  }, [filter]);

  return (
    <PageContainer className="py-6">
      <h1 className="font-heading text-2xl font-bold text-green-900 mb-4">
        Víno
      </h1>
      <FilterChips options={filters} value={filter} onChange={setFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {wineries.map((winery) => (
          <WineryCard key={winery.id} winery={winery} />
        ))}
      </div>
    </PageContainer>
  );
}
