"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Settings, Utensils, Film, Calendar, Newspaper,
  Tag, Wine, FileText,
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { WidgetRenderer } from "@/components/dashboard/WidgetRenderer";
import { useDashboardConfig } from "@/lib/hooks/useDashboardConfig";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return "Dobrou noc";
  if (hour < 12) return "Dobré ráno";
  if (hour < 18) return "Dobré odpoledne";
  return "Dobrý večer";
}

function formatCzechToday(): string {
  return new Date().toLocaleDateString("cs-CZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const domainBadges = [
  { icon: Utensils, label: "3 menu", color: "bg-gold-100 text-gold-700" },
  { icon: Calendar, label: "2 události", color: "bg-wine-100 text-wine-700" },
  { icon: Film, label: "5 filmů", color: "bg-gold-100 text-gold-700" },
  { icon: Newspaper, label: "8 zpráv", color: "bg-stone-100 text-stone-700" },
  { icon: Tag, label: "4 inzeráty", color: "bg-wine-100 text-wine-700" },
  { icon: Wine, label: "2 degustace", color: "bg-wine-100 text-wine-700" },
  { icon: FileText, label: "1 úřední", color: "bg-stone-100 text-stone-700" },
];

export default function MojeZnojmoPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const { enabledWidgets } = useDashboardConfig();
  const [greeting, setGreeting] = useState("Dobrý den");
  const [today, setToday] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/prihlaseni");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    setGreeting(getGreeting());
    setToday(formatCzechToday());
  }, []);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold-50/60 via-surface to-surface">
      <PageContainer className="py-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-heading text-2xl font-bold text-ink-900">
              {greeting}{user ? `, ${user.name}` : ""}
            </h1>
            {today && (
              <p className="text-sm text-stone-500 mt-0.5 capitalize">
                {today}
              </p>
            )}
          </div>
          <Link
            href="/moje-znojmo/nastaveni"
            className="w-9 h-9 rounded-base bg-white border border-stone-100 shadow-card flex items-center justify-center text-stone-500 hover:text-gold-700 hover:shadow-card-hover transition-all"
            title="Nastavení"
          >
            <Settings size={18} />
          </Link>
        </div>

        {/* Co je nového banner */}
        <div className="bg-white border border-stone-100 rounded-base p-4 mb-6 shadow-card">
          <p className="text-sm font-heading font-bold text-ink-900 mb-2.5">
            Co je nového ve Znojmě
          </p>
          <div className="flex flex-wrap gap-2">
            {domainBadges.map((b) => (
              <span
                key={b.label}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-base ${b.color}`}
              >
                <b.icon size={13} />
                {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Widget grid */}
        <DashboardGrid>
          <WidgetRenderer widgets={enabledWidgets} />
        </DashboardGrid>

        {enabledWidgets.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-base bg-gold-50 flex items-center justify-center mx-auto mb-4">
              <Settings size={24} className="text-gold-300" />
            </div>
            <p className="text-stone-500 mb-4 text-sm">
              Nemáte zapnuté žádné widgety.
            </p>
            <Link
              href="/moje-znojmo/nastaveni"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-700 bg-gold-50 hover:bg-gold-100 px-4 py-2 rounded-base transition-colors"
            >
              <Settings size={14} />
              Zapnout widgety
            </Link>
          </div>
        )}
      </PageContainer>
    </div>
  );
}
