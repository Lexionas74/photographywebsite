// /js/supabase.js

console.log("Loading supabase.js…");

// Your project info
const SUPABASE_URL = "https://ygnfuztbwsngjihrinlr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_2wnacEtDB7QrurjfEDMKw_1QIni9q";

// Create client using the CDN global
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Expose as global "supabase" (the client)
window.supabase = client;

console.log("Supabase client initialized");
