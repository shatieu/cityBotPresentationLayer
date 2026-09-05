"use client";

import dynamic from "next/dynamic";
import type { MapMarker } from "@/lib/types";

interface MapViewProps {
  markers: MapMarker[];
  className?: string;
}

const MapViewInner = dynamic(() => import("./MapViewInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-stone-100 flex items-center justify-center">
      <p className="text-sm text-stone-500">Načítání mapy...</p>
    </div>
  ),
});

export function MapView({ markers, className = "" }: MapViewProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <MapViewInner markers={markers} />
    </div>
  );
}
