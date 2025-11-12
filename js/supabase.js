// js/supabase.js
// Vanilla JS loader for Supabase "images" table

const SUPABASE_URL = "https://ygnfuztbwsngjihrinlr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbmZ1enRid3NuZ2ppaHJpbmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5ODUwOTMsImV4cCI6MjA3ODU2MTA5M30.YlKPGDE3hfF9mOIVbUEQQFtN8gwt6L0MOYldH1AOMGw"

async function fetchGalleryImages(gallery) {
  const url = `${SUPABASE_URL}/rest/v1/images` +
    `?gallery=eq.${encodeURIComponent(gallery)}` +
    `&select=*&order=created_at.desc`;

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
 * Render gallery into a container.
 * @param {string} gallery - e.g. "gtwc2025"
 * @param {string} selector - CSS selector for container (e.g. "#gtwc2025-gallery")
 */
async function renderGallery(gallery, selector) {
  const container = document.querySelector(selector);
  if (!container) {
    console.warn("Gallery container not found:", selector);
    return;
  }

  const images = await fetchGalleryImages(gallery);

  // If no images, do nothing (or show message)
  if (!images.length) {
    container.innerHTML = `<p class="text-center text-gray-400">No images yet.</p>`;
    return;
  }

  // Build the cards with same structure as your existing ones
  container.innerHTML = images.map((img) => `
    <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 card"
         data-src="${img.image_url}">
      <img src="${img.image_url}" alt="${img.title || "gallery image"}" class="w-full h-96 object-cover">
    </div>
  `).join("");

  // If you have modal/animation code that adds listeners to .card elements,
  // and it runs on DOMContentLoaded, it may not see these new cards.
  // If your modal logic is in a function, call it here, e.g.:
  // initModalForCards();
}
