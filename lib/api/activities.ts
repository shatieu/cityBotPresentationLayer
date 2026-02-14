import { fetchApi } from "./client";
import type { ActivityListResponse, ActivitySummary, ActivityDetail } from "@/lib/types";

export async function listActivities(params?: {
  category?: string;
  q?: string;
  limit?: number;
  offset?: number;
}): Promise<ActivitySummary[]> {
  const queryParams: Record<string, string> = {};
  if (params?.category) queryParams.category = params.category;
  if (params?.q) queryParams.q = params.q;
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.offset) queryParams.offset = String(params.offset);

  const res = await fetchApi<ActivityListResponse>("/activities", queryParams);
  return res.data ?? [];
}

export async function getActivity(id: string): Promise<ActivityDetail> {
  return fetchApi<ActivityDetail>(`/activities/${id}`);
}
