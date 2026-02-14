import { fetchApi } from "./client";
import type { DailyMenuListResponse, DailyMenuDetail } from "@/lib/types";

export async function getTodayMenus(params?: {
  limit?: number;
  offset?: number;
}): Promise<DailyMenuListResponse> {
  const queryParams: Record<string, string> = {};
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.offset) queryParams.offset = String(params.offset);
  return fetchApi<DailyMenuListResponse>("/menus/today", queryParams);
}

export async function getTodayMenu(slug: string): Promise<DailyMenuDetail> {
  return fetchApi<DailyMenuDetail>(`/menus/today/${slug}`);
}
