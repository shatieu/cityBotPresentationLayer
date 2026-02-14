import { fetchApi } from "./client";
import type { PlaceListResponse, PlaceDetail, PlaceType } from "@/lib/types";

export async function listPlaces(params?: {
  type?: PlaceType;
  q?: string;
  limit?: number;
  offset?: number;
}): Promise<PlaceListResponse> {
  const queryParams: Record<string, string> = {};
  if (params?.type) queryParams.type = params.type;
  if (params?.q) queryParams.q = params.q;
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.offset) queryParams.offset = String(params.offset);
  return fetchApi<PlaceListResponse>("/places", queryParams);
}

export async function getPlace(slug: string): Promise<PlaceDetail> {
  return fetchApi<PlaceDetail>(`/places/${slug}`);
}
