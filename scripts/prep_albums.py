"""Galerie par do /galeria/ – z folderów przysłanych przez Ewelinę 19.11.2026 (nazwa folderu = imiona pary).
Tworzy public/img/alb/* i src/lib/albums.json. Nową parę dodaje się, dopisując folder i wpis w COVER."""
import json, os, re, shutil
from PIL import Image, ImageOps
SRC = r"C:\Users\olo_p\Downloads\avocado-wt-galerie\pary"
BASE = os.path.join(os.path.dirname(__file__), "..")
OUT = os.path.join(BASE, "public", "img", "alb")
ORDER = ["Aleksandra, Maciej", "Kamila, Oskar", "Gabi, Kuba", "Aleksandra, Mikołaj", "Klaudia, Daniel", "Monika, Przemek", "Alicja, Krzysztof", "Agata,Jakub"]
COVER = {"Agata,Jakub": 12, "Aleksandra, Maciej": 6, "Alicja, Krzysztof": 15, "Gabi, Kuba": 11, "Kamila, Oskar": 28, "Klaudia, Daniel": 10, "Monika, Przemek": 13, "Aleksandra, Mikołaj": 8}
SLUG = str.maketrans("ąćęłńóśźżĄĆĘŁŃÓŚŹŻ", "acelnoszzACELNOSZZ")
if os.path.isdir(OUT): shutil.rmtree(OUT)
os.makedirs(OUT)
man = []
for folder in ORDER:
    a, b = [x.strip() for x in folder.split(",")]
    slug = re.sub(r"[^a-z]+", "-", f"{a}-{b}".translate(SLUG).lower()).strip("-")
    fs = sorted(f for f in os.listdir(os.path.join(SRC, folder)) if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp")))
    pics = []
    for k, f in enumerate(fs):
        im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, folder, f))).convert("RGB")
        if max(im.size) > 1500: im.thumbnail((1500, 1500), Image.LANCZOS)
        fn = f"{slug}-{k + 1}.webp"; im.save(os.path.join(OUT, fn), quality=78, method=6)
        pics.append({"src": f"/img/alb/{fn}", "w": im.width, "h": im.height})
    c = COVER[folder]
    land = [x for x in pics if x["w"] > x["h"]]  # baner podstrony = pierwsze poziome zdjęcie
    man.append({"slug": slug, "name": f"{a} & {b}", "cover": pics[c]["src"], "banner": (land[0] if land else pics[c])["src"], "pics": pics})
    print(slug, len(pics))
json.dump(man, open(os.path.join(BASE, "src", "lib", "albums.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
