"""Czwarta partia (16.11.2026): zdjęcia wskazane z nazwy w 'zmiany na stronce.docx' + foldery 18-stka / 25-lecie / 30-tka."""
import glob, os
from PIL import Image, ImageOps
R = r"C:\Users\olo_p\Downloads\wetransfer_avocado-zdjecia_2026-10-29_0759"
A = r"C:\Users\olo_p\Downloads\wetransfer_0646-jpg_2026-11-16_0906 (1)"
B = r"C:\Users\olo_p\Downloads\wetransfer_30tka_2026-11-16_0830 (1)"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "img")
def g(root, pat):
    r = sorted(glob.glob(os.path.join(root, pat))); assert r, pat; return r[0]
def save(path, name, w=1400, q=80):
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, f"{name}.webp"), quality=q, method=6); print(name, im.size)
# O nas
save(g(R, "Dzie*/Avocado00159.jpg"), "koord-natalia", 1000); save(g(R, "Dzie*/Avocado00158.jpg"), "koord-oskar", 1000); save(g(R, "kobieciarnia 2026/avocado82.jpg"), "koord-mateusz", 1000)
for n in ["031", "097", "117", "198"]: save(g(R, f"Dzie*/Avocado00{n}.jpg"), f"d-{n}", 800)
save(g(R, "jedzenie/*Fotografii00027.jpg"), "d-027", 800)
# Oferta (kafle)
save(g(R, "ROCZEK/*00014.jpg"), "of-przyjecia", 1400); save(g(B, "25lecie30.jpg"), "of-firma", 1400); save(g(R, "kobieciarnia 2026/avocado136.jpg"), "of-wydarzenia", 1400)
# Przełącznik sal
save(r"C:\Users\olo_p\Downloads\plenerowa za dnia.jpg", "plener-dzien-2", 1600, 86)
# Przyjęcia
save(g(R, "ROCZEK/*00038.jpg"), "prz-hero-1", 2000); save(g(B, "30tka/*(7).jpeg"), "prz-hero-2", 2000, 84)
for k, (root, pat) in enumerate([(R, "CHRZTY/*00077.jpg"), (R, "ROCZEK/*00025.jpg"), (R, "CHRZTY/*00121.jpg"), (R, "CHRZTY/*00128.jpg"), (R, "CHRZTY/*00166.jpg"), (R, "CHRZTY/*00088.jpg")], 1): save(g(root, pat), f"gchr-{k}")
for k, n in enumerate(["262", "254", "258"], 1): save(g(R, f"KOMUNIA/*{n}*.jpg"), f"gkom-{k}")
for k, f in enumerate(["0003", "0008", "0009", "0010", "0016", "0017", "0253", "0557", "0646"], 1): save(os.path.join(A, f + ".jpg"), f"g18-{k}")
for k in range(1, 9): save(g(B, f"30tka/*({k}).jpeg"), f"g30-{k}", 1400, 84)
for n in range(130, 142): save(g(R, f"SALA BANKIETOWA/*00{n}.jpg"), f"gsb-{n}")
# 25-lecie (impreza firmowa)
for n in [1, 10, 12, 13, 19, 26, 44, 45, 46, 165, 214, 226, 116, 35]: save(os.path.join(B, f"25lecie{n}.jpg"), f"gf-{n}")
