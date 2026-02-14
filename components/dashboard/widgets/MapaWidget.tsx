"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { WidgetCard } from "../WidgetCard";
import { WidgetCardHeader } from "../WidgetCardHeader";
import { MapView } from "@/components/map/MapView";
import type { MapMarker } from "@/lib/types";

export function MapaWidget() {
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { getMapMarkers } = await import("@/lib/api/map");
      const res = await getMapMarkers();
      setMarkers(res.data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <WidgetCard
      title="Mapa"
      icon="MapPin"
      href="/mapa"
      size="medium"
      accent="green"
      loading={loading}
      noPadding
    >
      <div className="px-4 pt-4 pb-2">
        <WidgetCardHeader title="Mapa" icon="MapPin" href="/mapa" accent="green" />
      </div>
      <div className="relative">
        <div className="h-[220px] overflow-hidden rounded-b-base">
          <MapView markers={markers} />
        </div>
        <Link
          href="/mapa"
          className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-xs font-medium text-green-900 bg-white/90 backdrop-blur-sm shadow-glass px-2.5 py-1.5 rounded-base hover:bg-white transition-colors"
        >
          <MapPin size={12} />
          Otevřít mapu
          <ArrowRight size={12} />
        </Link>
      </div>
    </WidgetCard>
  );
}
