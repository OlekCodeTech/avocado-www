"""Piąta partia (16.11.2026): pliki z niepobranych wcześniej WeTransferów Eweliny (Downloads\avocado-wt-1116)."""
import glob, os
from PIL import Image, ImageOps
W = r"C:\Users\olo_p\Downloads\avocado-wt-1116"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "img")
def save(path, name, w=1400, q=82):
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, f"{name}.webp"), quality=q, method=6); print(name, im.size)
D = os.path.join(W, "dagmara264"); P = os.path.join(W, "plenernoca")
save(os.path.join(D, "onas.png"), "onas", 2000, 86)
save(os.path.join(D, "Avocado178.jpg"), "wlasciciele-2", 1200)
save(os.path.join(D, "3U2A0102.jpeg"), "wes-hero-1", 2000, 86); save(os.path.join(D, "3U2A7000.jpeg"), "wes-hero-2", 2000, 86); save(os.path.join(D, "3U2A0591.jpeg"), "wes-hero-3", 2000, 86)
save(os.path.join(D, "plenernoca.jpg"), "plener-noc-2", 1600, 86)
save(os.path.join(D, "Pola torcik 2.png"), "gkom-0", 1400)
save(glob.glob(os.path.join(D, "Komunia*252.jpg"))[0], "gkom-4"); save(glob.glob(os.path.join(D, "Komunia*267.jpg"))[0], "gkom-5"); save(os.path.join(D, "post3.jpg"), "gkom-6")
fs = sorted(f for f in glob.glob(os.path.join(P, "SnapInsta*.jpg")))
for k, i in enumerate([4, 5, 11, 13, 15, 16, 17, 19], 1): save(fs[i], f"g18b-{k}")
for k, i in enumerate([1, 2, 6, 7, 8, 9, 20, 21, 0], 1): save(fs[i], f"slub-{k}")
