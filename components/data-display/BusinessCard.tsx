import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TrustBadge } from "./TrustBadge";
import type { BusinessSummary } from "@/lib/types";

interface BusinessCardProps {
  business: BusinessSummary;
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Link href={`/firmy/${business.slug}`}>
      <Card>
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-base bg-gold-100 flex items-center justify-center">
            <span className="font-heading text-lg font-semibold text-gold-700">
              {business.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading font-semibold text-ink-900">
                {business.name}
              </h3>
              {business.provenance && <TrustBadge provenance={business.provenance} />}
            </div>
            <p className="text-xs text-stone-500 mt-0.5">{business.address}</p>
            {business.tags && business.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {business.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="stone">{tag}</Badge>
                ))}
              </div>
            )}
            {business.services && business.services.length > 0 && (
              <p className="text-xs text-stone-500 mt-1.5 line-clamp-1">
                {business.services.slice(0, 3).join(" · ")}
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
