"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { WidgetCard } from "../WidgetCard";

interface GastroOffer {
  id: string;
  place_name: string;
  place_slug: string;
  title: string;
  description: string;
  valid_until: string;
  type: string;
}

const typeColors: Record<string, string> = {
  discount: "bg-green-100 text-green-700",
  happy_hour: "bg-amber-100 text-amber-700",
  deal: "bg-green-100 text-green-700",
  event: "bg-amber-100 text-amber-700",
};

const typeLabels: Record<string, string> = {
  discount: "Sleva",
  happy_hour: "Happy hour",
  deal: "Akce",
  event: "Událost",
};

export function GastroNabidkyWidget() {
  const [offers, setOffers] = useState<GastroOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const mod = await import("@/mocks/gastro-offers.json");
        const data = (mod.default ?? mod) as { data: GastroOffer[] };
        setOffers(data.data.slice(0, 3));
      } catch {
        setOffers([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <WidgetCard
      title="Gastro nabídky"
      icon="ShoppingBag"
      href="/gastro"
      size="medium"
      accent="green"
      loading={loading}
    >
      <div className="space-y-3">
        {offers.map((offer) => {
          const daysLeft = Math.max(0, Math.ceil((new Date(offer.valid_until).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

          return (
            <Link
              key={offer.id}
              href={`/gastro/${offer.place_slug}`}
              className="group block"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-base bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShoppingBag size={14} className="text-green-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-green-700 transition-colors truncate">
                      {offer.title}
                    </p>
                    <span className={`inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded-sm flex-shrink-0 ${typeColors[offer.type] ?? "bg-gray-100 text-gray-600"}`}>
                      {typeLabels[offer.type] ?? offer.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{offer.place_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {daysLeft > 0 ? `Platí ještě ${daysLeft} dní` : "Poslední den!"}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
        {offers.length === 0 && !loading && (
          <p className="text-sm text-gray-500">Žádné aktuální nabídky.</p>
        )}
      </div>
    </WidgetCard>
  );
}
