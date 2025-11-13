// ------------------------------------------------------------
// Supabase client used across your website
// Works for: uploading, deleting, gallery loading
// ------------------------------------------------------------

const SUPABASE_URL = "https://ygnfuztbwsngjihrinlr.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbmZ1enRid3NuZ2ppaHJpbmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5ODUwOTMsImV4cCI6MjA3ODU2MTA5M30.YlKPGDE3hfF9mOIVbUEQQFtN8gwt6L0MOYldH1AOMGw";

// Create the Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// ------------------------------------------------------------
// Fetch images from a gallery
// ------------------------------------------------------------
async function fetchGallery(galleryName) {
  const { data, error } = await supabase
    .from("images")
    .select("*")
    .eq("gallery", galleryName)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading gallery:", error);
    return [];
  }

  return data;
}


// ------------------------------------------------------------
// Extract correct storage path from any Supabase URL
// ------------------------------------------------------------
function extractStoragePath(imageUrl) {
  const url = new URL(imageUrl);
  const pathname = url.pathname;

  // Split after "/object/public/images/"
  return pathname.split("/object/public/images/")[1];
}


// ------------------------------------------------------------
// Delete image (CALLS EDGE FUNCTION)
// ------------------------------------------------------------
async function deleteImageFromServer(id, storagePath) {
  const res = await fetch(
    "https://ygnfuztbwsngjihrinlr.functions.supabase.co/delete",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, storagePath }),
    }
  );

  const data = await res.json();
  return data;
}
