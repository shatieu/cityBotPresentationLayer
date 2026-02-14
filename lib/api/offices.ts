import { fetchApi } from "./client";
import type {
  OfficeListResponse,
  OfficeSummary,
  OfficeDetail,
  NoticeListResponse,
  Notice,
  CouncilListResponse,
  CouncilSession,
} from "@/lib/types";

export async function listOffices(params?: {
  q?: string;
  limit?: number;
  offset?: number;
}): Promise<OfficeSummary[]> {
  const queryParams: Record<string, string> = {};
  if (params?.q) queryParams.q = params.q;
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.offset) queryParams.offset = String(params.offset);

  const res = await fetchApi<OfficeListResponse>("/offices", queryParams);
  return res.data ?? [];
}

export async function getOffice(slug: string): Promise<OfficeDetail> {
  return fetchApi<OfficeDetail>(`/offices/${slug}`);
}

export async function listNotices(): Promise<Notice[]> {
  const res = await fetchApi<NoticeListResponse>("/notices");
  return res.data ?? [];
}

export async function listCouncilSessions(): Promise<CouncilSession[]> {
  const res = await fetchApi<CouncilListResponse>("/council");
  return res.data ?? [];
}
