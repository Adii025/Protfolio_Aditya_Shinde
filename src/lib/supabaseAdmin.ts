import { createClient } from "@supabase/supabase-js";

// Admin-only Supabase client — uses the service role key, which bypasses
// Row Level Security entirely. NEVER import this into frontend/client
// components. Only use inside /api/admin/* route handlers (server-side).

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});