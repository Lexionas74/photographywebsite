// /js/supabase.js

// YOUR PROJECT URL
const SUPABASE_URL = "https://ygnfuztbwsngjihrinlr.supabase.co";

// YOUR NEW PUBLISHABLE API KEY
const SUPABASE_ANON_KEY = "sb_publishable_2wnacEtDB7Q7uvrjfEDMKw_1Q1niq6q";

// Create client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase client initialized");
