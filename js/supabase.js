// /js/supabase.js
// DO NOT PUT SUPABASE_URL OR KEYS HERE.
// They MUST be defined in admin.html BEFORE this file loads.

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
