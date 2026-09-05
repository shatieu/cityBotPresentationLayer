/**
 * Supabase client for the public presentation layer — anon key only.
 *
 * RLS on every content table enforces "public/anon can only select
 * status = 'published'" (see
 * ../../../cityBotIngestionLayer/docs/DATA_ARCHITECTURE.md, "Row Level
 * Security summary"), so it's safe to use the anon key straight from the
 * browser. Never import a service_role key here.
 *
 * This repo has no bundled backend of its own — lib/api/* queries this
 * client directly (no intermediate REST hop) when live data is enabled.
 * See lib/api/client.ts and the per-domain lib/api/*.ts files for the
 * USE_MOCKS / Supabase-env-vars switch.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * True only when both env vars are present. Gates the live/mock switch in
 * lib/api/*.ts — live data is used only when USE_MOCKS=false *and* this is
 * true, so the mock path keeps working out of the box wherever these vars
 * aren't configured (per the existing mock/live architecture).
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

let browserClient: SupabaseClient<Database> | undefined;

/**
 * Client for use in Client Components / browser code. Memoized so we don't
 * re-create a new client (and its internal realtime/auth machinery) on
 * every render.
 */
export function getBrowserSupabaseClient(): SupabaseClient<Database> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase env vars are not set (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY). " +
        "Check isSupabaseConfigured() before calling this."
    );
  }
  if (!browserClient) {
    browserClient = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return browserClient;
}

/**
 * Client for use in Server Components / route handlers / server actions.
 * A fresh client per call — this app never signs a user in server-side, so
 * there's no session to persist or refresh, and the anon key carries no
 * per-user identity to leak across requests.
 */
export function getServerSupabaseClient(): SupabaseClient<Database> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase env vars are not set (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY). " +
        "Check isSupabaseConfigured() before calling this."
    );
  }
  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Convenience for lib/api/*.ts: the right client for wherever this code
 * happens to run (Server Component fetch vs. "use client" page effect).
 * Both are anon-key/RLS-enforced reads; the only difference is session
 * persistence, which doesn't matter for this repo's read-only public
 * queries.
 */
export function getSupabaseClient(): SupabaseClient<Database> {
  return typeof window === "undefined" ? getServerSupabaseClient() : getBrowserSupabaseClient();
}
