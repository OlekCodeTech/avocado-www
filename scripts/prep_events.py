"""Zdjęcia do zakładki Wydarzenia wg numerów z 'zmiany na stronce.docx' (pkt 15). Tworzy public/img/ev/* i src/lib/events.json."""
import glob, json, os, shutil
from PIL import Image, ImageOps
R = r"C:\Users\olo_p\Downloads\wetransfer_avocado-zdjecia_2026-10-29_0759"
BASE = os.path.join(os.path.dirname(__file__), "..")
OUT = os.path.join(BASE, "public", "img", "ev")
if os.path.isdir(OUT): shutil.rmtree(OUT)
os.makedirs(OUT)
def find(folder, pats):
    for p in pats:
        r = sorted(glob.glob(os.path.join(R, folder, p)))
        if r: return r[0]
    return None
def dag(folder, n): return find(folder, [f"*Fotografii{int(n):05d}.jpg", f"*Fotografii{int(n):05d}.jpg*", f"*Fotografii{int(n):05d}*"])
def avo(folder, n): return find(folder, [f"[Aa]vocado{n}.jpg"])
def deg(n): return find(os.path.join("kolacja degustacyjna 1", "Highlights"), [f"*Fotografii({n}).jpg"])
SETS = {
 "walentynki": [("d", "kolacja walentynkowa 2026", n) for n in [67, 151, 388, 365, 399, 1009, 1439, 1641, 1791, 1858, 22, 7]] + [("a", "kolacja walentynkowa 2025", n) for n in [1, 7, 9, 16, 19, 29, 35, 47, 63, 71, 82, 84, 88, 93, 103, 119, 127, 128, 139, 149, 181]],
 "kobieciarnia": [("d", "kobieciarnia 2025", n) for n in [2, 6, 8, 10, 17, 29, 37, 48, 60, 65, 71, 75, 92, 97, 108, 144, 148, 170, 171, 180, 191, 206, 214, 236]] + [("a", "kobieciarnia 2026", n) for n in [22, 23, 25, 31, 36, 45, 72, 80, 98, 107, 112, 119, 121, 126, 127, 138, 140, 144, 149, 151, 153, 154, 157, 162, 167, 172, 178, 187, 202, 207, 221, 223, 256]],
 "degustacja": [("g", "", n) for n in [3, 7, 20, 23, 86, 110, 111, 126, 128, 131, 141, 149, 153, 155, 156, 179, 199, 255, 288, 291, 307, 353, 391, 397]],
}
man = {}; missing = []
for key, items in SETS.items():
    pics = []
    for kind, folder, n in items:
        p = dag(folder, n) if kind == "d" else avo(folder, n) if kind == "a" else deg(n)
        if not p: missing.append(f"{key}: {folder} {n}"); continue
        im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
        if max(im.size) > 1400: im.thumbnail((1400, 1400), Image.LANCZOS)
        fn = f"{key}-{len(pics) + 1}.webp"; im.save(os.path.join(OUT, fn), quality=78, method=6)
        pics.append({"src": f"/img/ev/{fn}"})
    man[key] = pics; print(key, len(pics), "/", len(items))
json.dump(man, open(os.path.join(BASE, "src", "lib", "events.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
hero = avo("kolacja walentynkowa 2025", 169); h2 = avo("kobieciarnia 2026", 169)
for src, name in [(hero, "wyd-hero"), (h2, "wyd-hero-kob")]:
    if src:
        im = ImageOps.exif_transpose(Image.open(src)).convert("RGB"); im.thumbnail((2000, 2000), Image.LANCZOS); im.save(os.path.join(BASE, "public", "img", f"{name}.webp"), quality=82, method=6); print(name, im.size)
print("BRAK:", missing)
