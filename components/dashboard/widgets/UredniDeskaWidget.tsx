"use client";

import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { WidgetCard } from "../WidgetCard";
import { formatCzechDate } from "@/lib/utils/format-date";

interface Notice {
  id: string;
  title: string;
  published_at: string;
  pdf_url?: string;
}

export function UredniDeskaWidget() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { listNotices } = await import("@/lib/api/offices");
      const items = await listNotices();
      setNotices(items.slice(0, 3) as Notice[]);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <WidgetCard
      title="Úřední deska"
      icon="FileText"
      href="/urady/uredni-deska"
      size="small"
      accent="neutral"
      loading={loading}
    >
      <div className="space-y-2.5">
        {notices.map((n) => (
          <div key={n.id} className="flex items-start gap-2.5">
            <FileText size={14} className="text-stone-500 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-ink-900 line-clamp-2 leading-snug">{n.title}</p>
              <p className="text-xs text-stone-500 mt-0.5">
                {formatCzechDate(n.published_at)}
              </p>
            </div>
          </div>
        ))}
        {notices.length === 0 && !loading && (
          <p className="text-sm text-stone-500">Žádné oznámení.</p>
        )}
      </div>
    </WidgetCard>
  );
}
