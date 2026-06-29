import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

// Fall back to harmless placeholder values when the real env vars are not
// set yet. This stops the app from crashing on startup with
// "@supabase/ssr: Your project's URL and API key are required..." while you
// finish setting up your .env.local file. Data calls will simply return
// empty results until real credentials are added — see SETUP.md.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn(
    "[supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are missing. " +
      "Add them to .env.local — see SETUP.md. Using placeholder values for now."
  );
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);