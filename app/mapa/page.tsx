"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FilterChips } from "@/components/filters/FilterChips";
import type { MapMarker } from "@/lib/types";

const MapView = dynamic(
  () => import("@/components/map/MapView").then((m) => m.MapView),
  { ssr: false, loading: () => <div className="w-full h-full bg-gold-50 animate-pulse" /> }
);

const typeFilters = [
  { value: "", label: "Vše" },
  { value: "restaurant", label: "Restaurace" },
  { value: "cafe", label: "Kavárny" },
  { value: "winery", label: "Vinařství" },
  { value: "cinema", label: "Kino" },
  { value: "theatre", label: "Divadlo" },
  { value: "attraction", label: "Památky" },
  { value: "office", label: "Úřady" },
  { value: "business", label: "Firmy" },
  { value: "sport", label: "Sport" },
];

export default function MapaPage() {
  const [type, setType] = useState("");
  const [markers, setMarkers] = useState<MapMarker[]>([]);

  useEffect(() => {
    async function load() {
      const { getMapMarkers } = await import("@/lib/api/map");
      const res = await getMapMarkers((type || undefined) as import("@/lib/types").PlaceType | undefined);
      setMarkers((res as unknown as { data: MapMarker[] }).data ?? []);
    }
    load();
  }, [type]);

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] md:h-[calc(100vh-64px)]">
      <div className="px-4 py-3 bg-white border-b border-stone-100 overflow-x-auto">
        <FilterChips options={typeFilters} value={type} onChange={setType} />
      </div>
      <div className="flex-1">
        <MapView markers={markers} />
      </div>
    </div>
  );
}
