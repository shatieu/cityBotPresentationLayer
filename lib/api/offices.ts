import { fetchApi, isLiveDataEnabled } from "./client";
import { getSupabaseClient } from "@/lib/supabase/client";
import { mapProvenance } from "./provenance";
import { mapPlaceSummary, type PlaceRow } from "./supabase-places";
import type {
  OfficeListResponse,
  OfficeSummary,
  OfficeDetail,
  NoticeListResponse,
  Notice,
  CouncilListResponse,
  CouncilSession,
  OpeningHours,
} from "@/lib/types";
import type { Tables } from "@/lib/supabase/types";

type GovernmentOfficeRow = Tables<"government_offices">;
type OfficePlaceRow = PlaceRow & { government_offices: GovernmentOfficeRow | null };

function mapOfficeSummary(row: OfficePlaceRow): OfficeSummary {
  const office = row.government_offices;
  return {
    ...mapPlaceSummary(row),
    department: office?.department ?? undefined,
    services: office?.services && office.services.length > 0 ? office.services : undefined,
  };
}

function mapOfficeDetail(row: OfficePlaceRow): OfficeDetail {
  return {
    ...mapOfficeSummary(row),
    description: row.description ?? undefined,
    opening_hours: (row.opening_hours as OpeningHours | null) ?? undefined,
    photos: row.photos && row.photos.length > 0 ? row.photos : undefined,
  };
}

export async function listOffices(params?: {
  q?: string;
  limit?: number;
  offset?: number;
}): Promise<OfficeSummary[]> {
  if (isLiveDataEnabled()) {
    const supabase = getSupabaseClient();
    let query = supabase
      .from("places")
      .select("*, government_offices(*)")
      .eq("status", "published")
      .eq("type", "office");

    if (params?.q) {
      const q = params.q.replace(/[%_]/g, "");
      query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`);
    }

    const limit = params?.limit ?? 50;
    const offset = params?.offset ?? 0;
    query = query.order("name", { ascending: true }).range(offset, offset + limit - 1);

    const { data, error } = await query;
    if (error) throw new Error(`Supabase listOffices failed: ${error.message}`);
    return (data ?? []).map((row) => mapOfficeSummary(row as OfficePlaceRow));
  }

  const queryParams: Record<string, string> = {};
  if (params?.q) queryParams.q = params.q;
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.offset) queryParams.offset = String(params.offset);

  const res = await fetchApi<OfficeListResponse>("/offices", queryParams);
  return res.data ?? [];
}

export async function getOffice(slug: string): Promise<OfficeDetail> {
  if (isLiveDataEnabled()) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("places")
      .select("*, government_offices(*)")
      .eq("status", "published")
      .eq("type", "office")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw new Error(`Supabase getOffice failed: ${error.message}`);
    if (!data) throw new Error(`Office not found: ${slug}`);
    return mapOfficeDetail(data as OfficePlaceRow);
  }

  return fetchApi<OfficeDetail>(`/offices/${slug}`);
}

// government_notices / council_sessions have no seeded rows yet (real
// content wasn't researched this pass — znojmocity.cz blocks generic bots,
// per DATA_ARCHITECTURE.md). Querying live still returns a correct (empty)
// result rather than mock placeholder content once USE_MOCKS=false.

export async function listNotices(): Promise<Notice[]> {
  if (isLiveDataEnabled()) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("government_notices")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) throw new Error(`Supabase listNotices failed: ${error.message}`);
    return (data ?? []).map((row) => ({
      id: row.id,
      title: row.title,
      published_at: row.published_at,
      expires_at: row.expires_at ?? undefined,
      document_url: row.document_url ?? undefined,
      category: row.category ?? undefined,
      provenance: mapProvenance(row),
    }));
  }

  const res = await fetchApi<NoticeListResponse>("/notices");
  return res.data ?? [];
}

export async function listCouncilSessions(): Promise<CouncilSession[]> {
  if (isLiveDataEnabled()) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("council_sessions")
      .select("*")
      .eq("status", "published")
      .order("session_date", { ascending: false });

    if (error) throw new Error(`Supabase listCouncilSessions failed: ${error.message}`);
    return (data ?? []).map((row) => ({
      id: row.id,
      title: row.title,
      date: row.session_date,
      summary: row.summary ?? undefined,
      minutes_url: row.minutes_url ?? undefined,
      status: row.session_status as CouncilSession["status"],
      provenance: mapProvenance(row),
    }));
  }

  const res = await fetchApi<CouncilListResponse>("/council");
  return res.data ?? [];
}
