import { fetchApi } from "./client";
import type { EventListResponse, EventDetail, EventCategory } from "@/lib/types";

export async function listEvents(params?: {
  from?: string;
  to?: string;
  category?: EventCategory;
  limit?: number;
  offset?: number;
}): Promise<EventListResponse> {
  const queryParams: Record<string, string> = {};
  if (params?.from) queryParams.from = params.from;
  if (params?.to) queryParams.to = params.to;
  if (params?.category) queryParams.category = params.category;
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.offset) queryParams.offset = String(params.offset);
  return fetchApi<EventListResponse>("/events", queryParams);
}

export async function getEvent(id: string): Promise<EventDetail> {
  return fetchApi<EventDetail>(`/events/${id}`);
}
