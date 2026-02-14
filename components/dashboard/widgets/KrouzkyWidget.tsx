"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { WidgetCard } from "../WidgetCard";
import type { ActivitySummary } from "@/lib/types";

export function KrouzkyWidget() {
  const [activities, setActivities] = useState<ActivitySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { listActivities } = await import("@/lib/api/activities");
      const items = await listActivities({ limit: 4 });
      setActivities(items);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <WidgetCard
      title="Kroužky"
      icon="Palette"
      href="/krouzky"
      size="small"
      accent="green"
      loading={loading}
    >
      <div className="space-y-2.5">
        {activities.map((a) => (
          <Link key={a.id} href={`/krouzky/${a.id}`} className="block group">
            <p className="text-sm font-medium text-gray-900 group-hover:text-green-700 transition-colors truncate">
              {a.title}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              {a.category && <Badge variant="gray">{a.category}</Badge>}
              {a.schedule && (
                <span className="font-data text-xs text-green-700 bg-green-50 px-1.5 py-0.5 rounded-sm">
                  {a.schedule}
                </span>
              )}
            </div>
          </Link>
        ))}
        {activities.length === 0 && !loading && (
          <p className="text-sm text-gray-500">Žádné kroužky.</p>
        )}
      </div>
    </WidgetCard>
  );
}
