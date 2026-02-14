import { fetchApi } from "./client";
import type { ShowtimeListResponse } from "@/lib/types";

export async function getShowtimes(date?: string): Promise<ShowtimeListResponse> {
  const params: Record<string, string> = {};
  if (date) params.date = date;
  return fetchApi<ShowtimeListResponse>("/cinema/showtimes", params);
}
