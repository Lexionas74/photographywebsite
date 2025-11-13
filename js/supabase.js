// ------------------------------------------------------
// Supabase Gallery Loader (vanilla JS)
// ------------------------------------------------------

const SUPABASE_URL = "https://ygnfuztbwsngjihrinlr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbmZ1enRid3NuZ2ppaHJpbmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5ODUwOTMsImV4cCI6MjA3ODU2MTA5M30.YlKPGDE3hfF9mOIVbUEQQFtN8gwt6L0MOYldH1AOMGws";

/**
 * Fetch all images for a given gallery.
 */
async function fetchGalleryImages(gallery) {
  const url =
    `${SUPABASE_URL}/rest/v1/images?gallery=eq.${encodeURIComponent(gallery)}&select=*&order=created_at.desc`;

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch images:", await res.text());
    return [];
  }

  return await res.json();
}

/**
 * Renders gallery items into a grid container.
 * This version produces the EXACT same card structure you originally used.
 */
async function renderGallery(galleryName, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.warn(`Gallery container not found: ${containerSelector}`);
    return;
  }

  const images = await fetchGalleryImages(galleryName);

  if (images.length === 0) {
    container.innerHTML = `
      <p class="text-gray-400 text-center col-span-full">No images uploaded yet.</p>
    `;
    return;
  }

  // Build cards
  container.innerHTML = images
    .map(
      (img) => `
      <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 card"
           data-src="${img.image_url}">
        <img src="${img.image_url}" alt="${img.title || 'Gallery Image'}" class="w-full h-96 object-cover">
      </div>
    `
    )
    .join("");

  // Reinitialize your modal logic for new .card elements
  if (typeof initModalForCards === "function") {
    initModalForCards();
  }
}
