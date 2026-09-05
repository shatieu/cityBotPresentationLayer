"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { useDashboardConfig } from "@/lib/hooks/useDashboardConfig";
import { WIDGET_REGISTRY } from "@/lib/types/dashboard";
import {
  Utensils, Film, Calendar, Wine, Newspaper, FileText,
  Tag, Palette, CloudSun, MessageCircle, MapPin, Theater,
  ShoppingBag,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Utensils, Film, Calendar, Wine, Newspaper, FileText,
  Tag, Palette, CloudSun, MessageCircle, MapPin, Theater,
  ShoppingBag,
};

const sizeLabels: Record<string, string> = {
  small: "Malý",
  medium: "Střední",
  large: "Velký",
};

export default function DashboardNastaveniPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const { config, toggleWidget } = useDashboardConfig();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/prihlaseni");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold-50/60 via-surface to-surface">
      <PageContainer className="py-6">
        <Link
          href="/moje-znojmo"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-gold-700 transition-colors mb-4"
        >
          <ArrowLeft size={14} />
          Zpět na dashboard
        </Link>

        <h1 className="font-heading text-2xl font-bold text-ink-900 mb-1">
          Nastavení dashboardu
        </h1>
        <p className="text-sm text-stone-500 mb-6">
          Vyberte, které widgety chcete zobrazovat. Změny se ukládají automaticky.
        </p>

        <div className="space-y-2 max-w-2xl">
          {WIDGET_REGISTRY.map((meta) => {
            const widgetConfig = config.widgets.find((w) => w.id === meta.id);
            const enabled = widgetConfig?.enabled ?? meta.defaultEnabled;
            const Icon = iconMap[meta.icon];

            return (
              <button
                key={meta.id}
                onClick={() => toggleWidget(meta.id)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-base border transition-all text-left
                  ${enabled
                    ? "bg-white border-gold-300 shadow-card"
                    : "bg-white/60 border-stone-100 opacity-70"
                  }
                  hover:shadow-card-hover hover:bg-white
                `}
              >
                {Icon && (
                  <div className={`w-9 h-9 rounded-base flex items-center justify-center flex-shrink-0 ${enabled ? "bg-gold-100" : "bg-stone-100"}`}>
                    <Icon
                      size={16}
                      className={enabled ? "text-gold-700" : "text-stone-500"}
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <span className={`font-heading font-semibold text-sm ${enabled ? "text-ink-900" : "text-stone-500"}`}>
                    {meta.title}
                  </span>
                  <span className="text-xs text-stone-500 ml-2">
                    {sizeLabels[meta.defaultSize]}
                  </span>
                </div>

                <div
                  className={`
                    relative w-10 h-6 rounded-full transition-colors flex-shrink-0
                    ${enabled ? "bg-gold-500" : "bg-stone-300"}
                  `}
                >
                  <div
                    className={`
                      absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform
                      ${enabled ? "translate-x-[18px]" : "translate-x-0.5"}
                    `}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-stone-500 mt-6 max-w-2xl">
          Nastavení se ukládají do prohlížeče (localStorage). Po připojení backendu se budou synchronizovat s vaším účtem.
        </p>
      </PageContainer>
    </div>
  );
}
