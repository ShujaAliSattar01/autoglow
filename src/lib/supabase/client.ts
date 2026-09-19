import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public (browser-safe) Supabase client. Uses only the publishable key.
// Add real values to .env.local -- see README.md for setup instructions.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabasePublishableKey!)
  : null;
