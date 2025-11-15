
const SUPABASE_URL = "https://ygnfuztbwsngjihrinlr.supabase.co";

const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbmZ1enRid3NuZ2ppaHJpbmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5ODUwOTMsImV4cCI6MjA3ODU2MTA5M30.YlKPGDE3hfF9mOIVbUEQQFtN8gwt6L0MOYldH1AOMGw";

console.log("Initializing Supabase client…");

window.supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

console.log("Supabase client initialized.");
