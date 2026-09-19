import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase client using the secret key for privileged
// operations (inserting appointments/testimonials, uploading images).
// NEVER import this file from a Client Component.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

export const isSupabaseAdminConfigured = Boolean(supabaseUrl && supabaseSecretKey);

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseAdminConfigured) return null;
  return createClient(supabaseUrl!, supabaseSecretKey!, {
    auth: { persistSession: false },
  });
}
