"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapMarker } from "@/lib/types";
import { MapMarkerPopup } from "./MapMarkerPopup";

interface MapViewInnerProps {
  markers: MapMarker[];
}

const ZNOJMO_CENTER: [number, number] = [48.8556, 16.0488];
const DEFAULT_ZOOM = 14;

const typeColors: Record<string, string> = {
  restaurant: "#4A6B2A",
  cinema: "#B8860B",
  winery: "#5E8A35",
  attraction: "#D4A024",
  accommodation: "#8A857C",
  sport: "#A3C47D",
  shopping: "#E8C965",
};

function createIcon(type: string) {
  const color = typeColors[type] || "#5C5850";
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="width:12px;height:12px;border-radius:2px;background:${color};border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}

export default function MapViewInner({ markers }: MapViewInnerProps) {
  return (
    <MapContainer
      center={ZNOJMO_CENTER}
      zoom={DEFAULT_ZOOM}
      className="w-full h-full"
      style={{ minHeight: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.lat, marker.lng]}
          icon={createIcon(marker.type)}
        >
          <Popup>
            <MapMarkerPopup marker={marker} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
