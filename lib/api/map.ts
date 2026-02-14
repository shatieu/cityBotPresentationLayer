import { fetchApi } from "./client";
import type { MapMarkerListResponse, PlaceType } from "@/lib/types";

export async function getMapMarkers(type?: PlaceType): Promise<MapMarkerListResponse> {
  const params: Record<string, string> = {};
  if (type) params.type = type;
  return fetchApi<MapMarkerListResponse>("/map/places", params);
}
