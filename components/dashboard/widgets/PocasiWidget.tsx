"use client";

import { CloudSun } from "lucide-react";
import { WidgetCard } from "../WidgetCard";

export function PocasiWidget() {
  const weather = {
    temp: 8,
    condition: "Částečně zataženo",
    high: 12,
    low: 3,
  };

  return (
    <WidgetCard
      title="Počasí"
      icon="CloudSun"
      href="#"
      size="small"
      accent="wine"
      loading={false}
      className="bg-wine-100"
    >
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <CloudSun size={32} className="text-wine-500 mb-1" />
          <span className="font-data text-3xl font-bold text-ink-900 leading-none">{weather.temp}°</span>
        </div>
        <div>
          <p className="text-sm font-medium text-ink-900">{weather.condition}</p>
          <p className="text-xs text-stone-500 mt-0.5">
            <span className="font-data font-medium text-wine-700">{weather.high}°</span>
            {" / "}
            <span className="font-data">{weather.low}°</span>
          </p>
          <p className="text-xs text-stone-500 mt-0.5">Znojmo</p>
        </div>
      </div>
    </WidgetCard>
  );
}
