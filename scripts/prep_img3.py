"""Trzecia partia (11.11.2026): zdjęcia wskazane przez Ewelinę w 'stronka PIOTR.docx' (intro, wybór sal),
8 nowych webp oraz dodatkowe zdjęcia do galerii.
Użycie: python scripts/prep_img3.py <match.json> <sheets/index.json> <sheets2/index.json>"""
import json, os, sys
from PIL import Image, ImageOps
M = json.load(open(sys.argv[1])); I1 = json.load(open(sys.argv[2], encoding="utf8")); I2 = json.load(open(sys.argv[3], encoding="utf8"))
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "img")
def save(path, name, w, q=78):
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, f"{name}.webp"), quality=q, method=6); print(name, im.size)
# intro: numer obrazka w docx -> najlepszy oryginał (dla 4 bierzemy wersję hi-res z folderu)
for i in range(1, 16):
    c = M[str(i)]; p = c[0][1]
    if i == 4: p = c[1][1]
    save(p, f"intro-{i:02d}", 2000)
save(M["17"][0][1], "hall-bank", 1600); save(M["18"][0][1], "hall-plener", 1600)
NEW = r"C:\Users\olo_p\Downloads\wetransfer_unnamed-1-webp_2026-11-10_1259"
for k, f in enumerate(["unnamed (3).webp", "unnamed (4).webp", "unnamed (5).webp", "unnamed (6).webp", "unnamed (7).webp", "unnamed.webp"], 1):
    save(os.path.join(NEW, f), f"nw-{k}", 1360, 82)
P2 = {"pl-wn-1": 3, "pl-wn-2": 9, "pl-wn-3": 17, "pl-wn-4": 44, "pl-wn-5": 6, "pl-wn-6": 23, "pl-wn-7": 79, "pl-wn-8": 84,
      "pl-zew-2": 71, "pl-zew-3": 91, "pl-zew-4": 88, "pl-tort-1": 10, "pl-tort-2": 67, "pl-tort-3": 94, "pl-goscie": 65,
      "pl-cer-2": 43, "pl-cer-3": 72, "pl-para-1": 87, "pl-para-2": 36, "pl-para-3": 90, "pl-slodki": 83, "pl-las": 21}
for n, k in P2.items(): save(I2[f"SALAPLENEROWA#{k}"], n, 1400)
for pre, key, picks in [("kob", "kobieciarnia2026", [0, 28, 16, 31, 36, 41, 10, 32]), ("wal", "kolacjawalentynkowa2026", [2, 10, 21, 32, 18, 44, 1, 12]),
                        ("dg", "degust", [0, 11, 24, 44, 41, 7, 47]), ("kom", "KOMUNIA", [12, 19, 28, 32, 1, 23, 47, 4])]:
    for j, k in enumerate(picks, 5): save(I2[f"{key}#{k}"], f"{pre}-{j}", 1400)
for pre, key, picks in [("bk", "SALABANKIETO", [64, 68, 69, 72, 77, 80, 56, 85, 88, 49, 84]), ("chr", "CHRZTY", [8, 4, 19, 20, 10]), ("roc", "ROCZEK", [2, 7, 20, 13, 29, 25])]:
    for j, k in enumerate(picks, 1): save(I1[f"{key}#{k}"], f"{pre}-{j}", 1400)
