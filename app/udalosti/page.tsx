"use client";

import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { TabLayout } from "@/components/layout/TabLayout";
import { FilterChips } from "@/components/filters/FilterChips";
import { EventCard } from "@/components/data-display/EventCard";
import type { EventSummary } from "@/lib/types";

const tabs = [
  { id: "kalendar", label: "Kalendář" },
  { id: "komunitni", label: "Komunitní" },
];

const categoryFilters = [
  { value: "", label: "Vše" },
  { value: "festivals", label: "Festivaly" },
  { value: "concerts", label: "Koncerty" },
  { value: "wine", label: "Víno" },
  { value: "theatre", label: "Divadlo" },
  { value: "sport", label: "Sport" },
];

export default function UdalostiPage() {
  const [category, setCategory] = useState("");
  const [events, setEvents] = useState<EventSummary[]>([]);

  useEffect(() => {
    async function load() {
      const { listEvents } = await import("@/lib/api/events");
      const params: Record<string, string> = {};
      if (category) params.category = category;
      const res = await listEvents(params);
      setEvents((res as unknown as { data: EventSummary[] }).data ?? []);
    }
    load();
  }, [category]);

  return (
    <PageContainer className="py-6">
      <h1 className="font-heading text-2xl font-bold text-ink-900 mb-4">
        Události
      </h1>

      <TabLayout tabs={tabs}>
        {(activeTab) => (
          <div>
            <FilterChips
              options={categoryFilters}
              value={category}
              onChange={setCategory}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {events
                .filter((e) =>
                  activeTab === "komunitni"
                    ? e.source_type === "community"
                    : e.source_type !== "community"
                )
                .map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </div>
        )}
      </TabLayout>
    </PageContainer>
  );
}
