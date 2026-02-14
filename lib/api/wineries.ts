import { fetchApi } from "./client";
import type { WineryListResponse, WineryDetail } from "@/lib/types";

export async function listWineries(params?: {
  open_today?: boolean;
  limit?: number;
  offset?: number;
}): Promise<WineryListResponse> {
  const queryParams: Record<string, string> = {};
  if (params?.open_today !== undefined) queryParams.open_today = String(params.open_today);
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.offset) queryParams.offset = String(params.offset);
  return fetchApi<WineryListResponse>("/wineries", queryParams);
}

export async function getWinery(slug: string): Promise<WineryDetail> {
  return fetchApi<WineryDetail>(`/wineries/${slug}`);
}
