"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { UtensilsCrossed, Calendar, User, BarChart3, TrendingUp, Users } from "lucide-react";

const quickActions = [
  { href: "/firma/menu", label: "Upravit denní menu", icon: UtensilsCrossed, description: "Zadejte dnešní menu vaší restaurace" },
  { href: "/firma/udalosti", label: "Spravovat události", icon: Calendar, description: "Přidejte a spravujte své události" },
  { href: "/firma/profil", label: "Firemní profil", icon: User, description: "Upravte údaje o firmě" },
];

const stats = [
  { label: "Zobrazení profilu", value: "1 247", change: "+12%", icon: BarChart3 },
  { label: "Kliknutí na menu", value: "389", change: "+8%", icon: TrendingUp },
  { label: "Unikátní návštěvníci", value: "876", change: "+15%", icon: Users },
];

export default function FirmaDashboardPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/prihlaseni");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <PageContainer className="py-6">
      <h1 className="font-heading text-2xl font-bold text-ink-900 mb-1">
        Dashboard firmy
      </h1>
      <p className="text-sm text-stone-700 mb-6">
        Spravujte vaši firmu na Znojmo City Hub
      </p>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-base bg-gold-50 flex items-center justify-center flex-shrink-0">
                <stat.icon size={20} className="text-gold-700" />
              </div>
              <div>
                <p className="text-xs text-stone-500">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-data text-xl font-bold text-ink-900">{stat.value}</span>
                  <span className="text-xs font-medium text-gold-700">{stat.change}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className="font-heading text-lg font-semibold text-ink-900 mb-3">Rychlé akce</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Card className="h-full">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-base bg-gold-100 flex items-center justify-center flex-shrink-0">
                  <action.icon size={20} className="text-gold-700" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-ink-900">
                    {action.label}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {action.description}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
