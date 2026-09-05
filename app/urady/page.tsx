"use client";

import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { TabLayout } from "@/components/layout/TabLayout";
import { SearchBar } from "@/components/filters/SearchBar";
import { OfficeCard } from "@/components/data-display/OfficeCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCzechDate } from "@/lib/utils/format-date";
import type { OfficeSummary, Notice, CouncilSession } from "@/lib/types";

const tabs = [
  { id: "urady", label: "Úřady" },
  { id: "deska", label: "Úřední deska" },
  { id: "zastupitelstvo", label: "Zastupitelstvo" },
];

export default function UradyPage() {
  const [query, setQuery] = useState("");
  const [offices, setOffices] = useState<OfficeSummary[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [council, setCouncil] = useState<CouncilSession[]>([]);

  useEffect(() => {
    async function load() {
      const { listOffices, listNotices, listCouncilSessions } = await import("@/lib/api/offices");
      const [offRes, notRes, couRes] = await Promise.all([
        listOffices({ q: query || undefined }),
        listNotices(),
        listCouncilSessions(),
      ]);
      setOffices(offRes);
      setNotices(notRes);
      setCouncil(couRes);
    }
    load();
  }, [query]);

  return (
    <PageContainer className="py-6">
      <h1 className="font-heading text-2xl font-bold text-ink-900 mb-4">
        Úřady
      </h1>

      <TabLayout tabs={tabs}>
        {(activeTab) => {
          if (activeTab === "urady") {
            return (
              <div>
                <div className="mb-6">
                  <SearchBar
                    value={query}
                    onChange={setQuery}
                    placeholder="Hledat úřad..."
                  />
                </div>
                <div className="space-y-4">
                  {offices.map((office) => (
                    <OfficeCard key={office.id} office={office} />
                  ))}
                </div>
              </div>
            );
          }

          if (activeTab === "deska") {
            return (
              <div className="space-y-4">
                {notices.map((notice) => (
                  <Card key={notice.id}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-heading font-semibold text-ink-900">
                          {notice.title}
                        </h3>
                        <p className="text-xs text-stone-500 mt-1">
                          Zveřejněno: {formatCzechDate(notice.published_at)}
                          {notice.expires_at && ` · Platnost do: ${formatCzechDate(notice.expires_at)}`}
                        </p>
                      </div>
                      {notice.document_url && (
                        <a
                          href={notice.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gold-700 hover:text-gold-500 font-medium whitespace-nowrap"
                        >
                          PDF
                        </a>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            );
          }

          return (
            <div className="space-y-4">
              {council.map((session) => (
                <Card key={session.id}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-heading font-semibold text-ink-900">
                        {session.title}
                      </h3>
                      <p className="text-sm text-stone-700 mt-1">
                        <time dateTime={session.date}>
                          {formatCzechDate(session.date)}
                        </time>
                      </p>
                      {session.summary && (
                        <p className="text-sm text-stone-500 mt-1 line-clamp-2">
                          {session.summary}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={session.minutes_url ? "gold" : "stone"}>
                        {session.minutes_url ? "Proběhlo" : "Nadcházející"}
                      </Badge>
                      {session.minutes_url && (
                        <a
                          href={session.minutes_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gold-700 hover:text-gold-500"
                        >
                          Zápis
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          );
        }}
      </TabLayout>
    </PageContainer>
  );
}
