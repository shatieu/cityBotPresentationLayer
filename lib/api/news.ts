import { fetchApi } from "./client";
import type { NewsListResponse, NewsSummary, NewsDetail } from "@/lib/types";

export async function listNews(params?: {
  q?: string;
  limit?: number;
  offset?: number;
}): Promise<NewsSummary[]> {
  const queryParams: Record<string, string> = {};
  if (params?.q) queryParams.q = params.q;
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.offset) queryParams.offset = String(params.offset);

  const res = await fetchApi<NewsListResponse>("/news", queryParams);
  return res.data ?? [];
}

export async function getNewsArticle(id: string): Promise<NewsDetail> {
  return fetchApi<NewsDetail>(`/news/${id}`);
}
