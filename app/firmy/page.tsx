"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SearchBar } from "@/components/filters/SearchBar";
import { BusinessCard } from "@/components/data-display/BusinessCard";
import { Button } from "@/components/ui/Button";
import type { BusinessSummary } from "@/lib/types";

export default function FirmyPage() {
  const [query, setQuery] = useState("");
  const [businesses, setBusinesses] = useState<BusinessSummary[]>([]);

  useEffect(() => {
    async function load() {
      const { listBusinesses } = await import("@/lib/api/businesses");
      const res = await listBusinesses({ q: query || undefined });
      setBusinesses(res);
    }
    load();
  }, [query]);

  return (
    <PageContainer className="py-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-green-900 mb-1">
            Firmy a služby
          </h1>
          <p className="text-sm text-gray-700">
            Najděte firmu, řemeslníka nebo službu ve Znojmě
          </p>
        </div>
        <Link href="/firmy/chat">
          <Button variant="secondary" size="sm">
            <MessageCircle size={16} />
            Průvodce
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Hledat firmu, službu, řemeslníka..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </PageContainer>
  );
}
