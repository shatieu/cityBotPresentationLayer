/**
 * Reconciles the DB's provenance naming with what the frontend already
 * expects.
 *
 * Flagged in ../../../cityBotIngestionLayer/docs/DATA_ARCHITECTURE.md
 * ("Naming deviation to flag") and ../../ARCHITECTURE.md: the schema's
 * `trust_tier` column uses underscores (`human_verified`, `auto_scraped`,
 * per the build brief), while this repo's generated lib/types/api.ts (and
 * TrustBadge, which keys a lookup table off TrustTier) uses hyphens
 * (`"human-verified"`, `"auto-scraped"`). Fixed here, at the API boundary,
 * rather than by touching the DB or the generated types/components.
 *
 * Also handles `trust_tier IS NULL` (some seeded rows are legitimately
 * unverified — see scripts/seed.ts's header comment in the ingestion repo)
 * by omitting `provenance` entirely rather than crashing TrustBadge, which
 * indexes its color/label table by a non-null TrustTier. Every place that
 * renders a TrustBadge already guards with `x.provenance && <TrustBadge .../>`.
 */
import type { DataProvenance, TrustTier } from "@/lib/types";

const DB_TO_FRONTEND_TRUST_TIER: Record<string, TrustTier> = {
  owner: "owner",
  human_verified: "human-verified",
  ai_verified: "ai-verified",
  auto_scraped: "auto-scraped",
};

/** Shape shared by every provenance-bearing table row (places, wineries, events, ...). */
export interface ProvenanceRow {
  trust_tier: string | null;
  source: string | null;
  updated_at: string;
}

export function mapProvenance(row: ProvenanceRow): DataProvenance | undefined {
  if (!row.trust_tier) return undefined;
  const trust_tier = DB_TO_FRONTEND_TRUST_TIER[row.trust_tier];
  if (!trust_tier) return undefined;
  return {
    trust_tier,
    source: row.source ?? "unknown",
    updated_at: row.updated_at,
  };
}
