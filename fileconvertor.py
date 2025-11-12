from PIL import Image
import os
import io


input_folder = "input_images"
output_folder = "output_webp"

# what is the target size in bytes
TARGET_SIZE = 1_000_000  

os.makedirs(input_folder, exist_ok=True)
os.makedirs(output_folder, exist_ok=True)

def compress_to_target(img, output_path, target_size=TARGET_SIZE, min_quality=40, max_quality=95):
    low, high = min_quality, max_quality
    best_quality = low
    best_bytes = None

    while low <= high:
        q = (low + high) // 2
        buffer = io.BytesIO()
        img.save(buffer, format="WEBP", quality=q)
        size = buffer.tell()

        if size <= target_size:
            best_quality = q
            best_bytes = buffer.getvalue()
            low = q + 1  
        else:
            high = q - 1  

    if best_bytes is None:

        img.save(output_path, "WEBP", quality=min_quality)
    else:
        with open(output_path, "wb") as f:
            f.write(best_bytes)
    return best_quality, len(best_bytes) if best_bytes else os.path.getsize(output_path)

for filename in os.listdir(input_folder):
    if filename.lower().endswith((".jpg", ".jpeg")):
        jpg_path = os.path.join(input_folder, filename)
        webp_filename = os.path.splitext(filename)[0] + ".webp"
        webp_path = os.path.join(output_folder, webp_filename)

        with Image.open(jpg_path) as img:
            img = img.convert("RGB")
            q, final_size = compress_to_target(img, webp_path)
        
        print(f"Converted {filename} → {webp_filename} | quality={q}, size={final_size/1024:.1f} KB")

print("images converted successfully.")
