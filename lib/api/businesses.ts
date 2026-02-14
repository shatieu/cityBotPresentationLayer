import { fetchApi } from "./client";
import type { BusinessListResponse, BusinessSummary, BusinessDetail } from "@/lib/types";

export async function listBusinesses(params?: {
  q?: string;
  tags?: string;
  limit?: number;
  offset?: number;
}): Promise<BusinessSummary[]> {
  const queryParams: Record<string, string> = {};
  if (params?.q) queryParams.q = params.q;
  if (params?.tags) queryParams.tags = params.tags;
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.offset) queryParams.offset = String(params.offset);

  const res = await fetchApi<BusinessListResponse>("/businesses", queryParams);
  return res.data ?? [];
}

export async function getBusiness(slug: string): Promise<BusinessDetail> {
  return fetchApi<BusinessDetail>(`/businesses/${slug}`);
}
