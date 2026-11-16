"""Albumy do /galeria/: po kilkanaście zdjęć z każdej sesji (nazwy z nazw plików od klienta). Tworzy public/img/alb/* i src/lib/albums.json."""
import glob, json, os
from PIL import Image, ImageOps
R = r"C:\Users\olo_p\Downloads\wetransfer_avocado-zdjecia_2026-10-29_0759"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "img", "alb"); os.makedirs(OUT, exist_ok=True)
ALB = [  # slug, nazwa, podpis, wzorce plików, ile
    ("michalina-michal", "Michalina & Michał", "Wesele · sala plenerowa", ["SALA PLENEROWA/Wesele_Michalina&Micha*"], 14),
    ("gabi-kuba", "Gabi & Kuba", "Wesele i poprawiny · sala bankietowa", ["wesele Gabi i kuba/*"], 14),
    ("a-j", "A & J", "Ślub w plenerze", ["*lub aj/*"], 12),
    ("n-k", "N & K", "Wesele · sala bankietowa", ["SALA BANKIETOWA/p-N&K*"], 12),
    ("paulina-igor", "Paulina & Igor", "Wesele · sala plenerowa", ["SALA PLENEROWA/Wesele_Paulina&Igor*"], 8),
    ("sabina-nick", "Sabina & Nick", "Wesele · sala plenerowa", ["SALA PLENEROWA/Sabina&Nick*"], 8),
    ("ola-bartosz", "Ola & Bartosz", "Wesele · sala bankietowa", ["SALA BANKIETOWA/Ola_Bartosz*"], 7),
    ("natalia-blazej", "Natalia & Błażej", "Wesele · sala plenerowa", ["SALA PLENEROWA/Natalia i B*"], 5),
]
man = []
for slug, name, sub, pats, n in ALB:
    fs = sorted(f for p in pats for f in glob.glob(os.path.join(R, p)) if f.lower().endswith((".jpg", ".jpeg", ".webp", ".png")))
    step = max(1, len(fs) / n); pick = [fs[int(i * step)] for i in range(min(n, len(fs)))]
    pics = []
    for k, f in enumerate(pick, 1):
        im = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
        if max(im.size) > 1400: im.thumbnail((1400, 1400), Image.LANCZOS)
        fn = f"{slug}-{k}.webp"; im.save(os.path.join(OUT, fn), quality=78, method=6)
        pics.append({"src": f"/img/alb/{fn}", "w": im.width, "h": im.height})
    man.append({"slug": slug, "name": name, "sub": sub, "pics": pics}); print(slug, len(fs), "->", len(pics))
json.dump(man, open(os.path.join(os.path.dirname(__file__), "..", "src", "lib", "albums.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
