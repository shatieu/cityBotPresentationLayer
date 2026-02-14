"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { TabLayout } from "@/components/layout/TabLayout";
import { SearchBar } from "@/components/filters/SearchBar";
import { ClassifiedCard } from "@/components/data-display/ClassifiedCard";
import { Button } from "@/components/ui/Button";
import type { ClassifiedSummary } from "@/lib/types";

const tabs = [
  { id: "offer", label: "Nabídky" },
  { id: "request", label: "Poptávky" },
  { id: "job", label: "Práce" },
];

export default function InzercePage() {
  const [query, setQuery] = useState("");
  const [ads, setAds] = useState<ClassifiedSummary[]>([]);

  useEffect(() => {
    async function load() {
      const { listClassifieds } = await import("@/lib/api/classifieds");
      const res = await listClassifieds({ q: query || undefined });
      setAds(res);
    }
    load();
  }, [query]);

  return (
    <PageContainer className="py-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h1 className="font-heading text-2xl font-bold text-green-900">
          Inzerce
        </h1>
        <Link href="/inzerce/pridat">
          <Button variant="primary" size="sm">
            <Plus size={16} />
            Přidat inzerát
          </Button>
        </Link>
      </div>

      <div className="mb-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Hledat inzeráty..."
        />
      </div>

      <TabLayout tabs={tabs}>
        {(activeTab) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ads
              .filter((ad) => ad.ad_type === activeTab)
              .map((ad) => (
                <ClassifiedCard key={ad.id} ad={ad} />
              ))}
          </div>
        )}
      </TabLayout>
    </PageContainer>
  );
}
