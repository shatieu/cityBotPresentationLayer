import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TrustBadge } from "./TrustBadge";
import type { OfficeSummary } from "@/lib/types";

interface OfficeCardProps {
  office: OfficeSummary;
}

export function OfficeCard({ office }: OfficeCardProps) {
  return (
    <Link href={`/urady/${office.slug}`}>
      <Card>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-heading font-semibold text-ink-900">
              {office.name}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">{office.address}</p>
            {office.department && (
              <Badge variant="default" className="mt-2">
                {office.department}
              </Badge>
            )}
            {office.services && office.services.length > 0 && (
              <p className="text-xs text-stone-500 mt-1.5 line-clamp-1">
                {office.services.slice(0, 3).join(" · ")}
              </p>
            )}
          </div>
          {office.provenance && <TrustBadge provenance={office.provenance} />}
        </div>
        {office.phone && (
          <p className="text-sm text-stone-700 mt-2 font-data">{office.phone}</p>
        )}
      </Card>
    </Link>
  );
}
