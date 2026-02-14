import { fetchApi } from "./client";
import type { ClassifiedListResponse, ClassifiedSummary, ClassifiedDetail } from "@/lib/types";

export async function listClassifieds(params?: {
  ad_type?: string;
  category?: string;
  q?: string;
  limit?: number;
  offset?: number;
}): Promise<ClassifiedSummary[]> {
  const queryParams: Record<string, string> = {};
  if (params?.ad_type) queryParams.ad_type = params.ad_type;
  if (params?.category) queryParams.category = params.category;
  if (params?.q) queryParams.q = params.q;
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.offset) queryParams.offset = String(params.offset);

  const res = await fetchApi<ClassifiedListResponse>("/classifieds", queryParams);
  return res.data ?? [];
}

export async function getClassified(id: string): Promise<ClassifiedDetail> {
  return fetchApi<ClassifiedDetail>(`/classifieds/${id}`);
}
