import { Tooltip } from "@/components/ui/Tooltip";
import type { DataProvenance, TrustTier } from "@/lib/types";
import { formatDateWithTime } from "@/lib/utils/format-date";

interface TrustBadgeProps {
  provenance: DataProvenance;
  className?: string;
}

const tierConfig: Record<TrustTier, { color: string; label: string }> = {
  owner: { color: "bg-gold-700", label: "Ověřeno majitelem" },
  "human-verified": { color: "bg-gold-300", label: "Ověřeno redaktorem" },
  "ai-verified": { color: "bg-wine-300", label: "Automaticky ověřeno" },
  "auto-scraped": { color: "bg-stone-300", label: "Automaticky staženo" },
};

export function TrustBadge({ provenance, className = "" }: TrustBadgeProps) {
  const config = tierConfig[provenance.trust_tier];
  const tooltipText = `${config.label} · ${provenance.source} · ${formatDateWithTime(provenance.updated_at)}`;

  return (
    <Tooltip text={tooltipText}>
      <span className={`inline-flex items-center gap-1.5 ${className}`}>
        <span className={`inline-block w-2 h-2 rounded-sm ${config.color}`} />
        <span className="text-xs text-stone-700">
          {provenance.source}
        </span>
      </span>
    </Tooltip>
  );
}
