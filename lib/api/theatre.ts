import { fetchApi } from "./client";
import type { TheatreListResponse, TheatreShow } from "@/lib/types";

export async function getTheatreProgram(): Promise<TheatreShow[]> {
  const res = await fetchApi<TheatreListResponse>("/theatre/program");
  return res.data ?? [];
}
