import { Tooltip } from "@/components/ui/Tooltip";
import type { DataProvenance, TrustTier } from "@/lib/types";
import { formatDateWithTime } from "@/lib/utils/format-date";

interface TrustBadgeProps {
  provenance: DataProvenance;
  className?: string;
}

const tierConfig: Record<TrustTier, { color: string; label: string }> = {
  owner: { color: "bg-green-700", label: "Ověřeno majitelem" },
  "human-verified": { color: "bg-green-300", label: "Ověřeno redaktorem" },
  "ai-verified": { color: "bg-amber-300", label: "Automaticky ověřeno" },
  "auto-scraped": { color: "bg-gray-300", label: "Automaticky staženo" },
};

export function TrustBadge({ provenance, className = "" }: TrustBadgeProps) {
  const config = tierConfig[provenance.trust_tier];
  const tooltipText = `${config.label} · ${provenance.source} · ${formatDateWithTime(provenance.updated_at)}`;

  return (
    <Tooltip text={tooltipText}>
      <span className={`inline-flex items-center gap-1.5 ${className}`}>
        <span className={`inline-block w-2 h-2 rounded-sm ${config.color}`} />
        <span className="text-xs text-gray-700">
          {provenance.source}
        </span>
      </span>
    </Tooltip>
  );
}
