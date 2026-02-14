import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TrustBadge } from "./TrustBadge";
import { formatRelativeDate } from "@/lib/utils/format-date";
import type { ClassifiedSummary } from "@/lib/types";

interface ClassifiedCardProps {
  ad: ClassifiedSummary;
}

const adTypeLabels: Record<string, string> = {
  offer: "Nabídka",
  request: "Poptávka",
  job: "Práce",
};

const adTypeVariants: Record<string, "default" | "green" | "amber" | "gray"> = {
  offer: "green",
  request: "amber",
  job: "default",
};

export function ClassifiedCard({ ad }: ClassifiedCardProps) {
  return (
    <Link href={`/inzerce/${ad.id}`}>
      <Card>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-heading font-semibold text-green-900">
              {ad.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <Badge variant={adTypeVariants[ad.ad_type] ?? "gray"}>
                {adTypeLabels[ad.ad_type] ?? ad.ad_type}
              </Badge>
              {ad.category && (
                <Badge variant="gray">{ad.category}</Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              {ad.price && (
                <span className="font-data text-sm text-amber-700">{ad.price}</span>
              )}
              <span className="text-xs text-gray-500">
                {ad.location} · {formatRelativeDate(ad.created_at)}
              </span>
            </div>
          </div>
          {ad.provenance && <TrustBadge provenance={ad.provenance} />}
        </div>
      </Card>
    </Link>
  );
}
