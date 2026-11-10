"""Druga partia zdjęć: pełny WeTransfer (sala plenerowa, komunia, kobieciarnia, walentynki) + domki z IdoBooking."""
import json, os, sys
from PIL import Image, ImageOps
IDX = json.load(open(sys.argv[1], encoding="utf8")); IDO = sys.argv[2]
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "img")
PICK = {
    "plener-lato": ("SALAPLENEROWA#11", 2000), "plener-dron": ("SALAPLENEROWA#4", 1600), "plener-noc": ("SALAPLENEROWA#75", 1600),
    "plener-front": ("SALAPLENEROWA#77", 1600), "plener-wnetrze": ("SALAPLENEROWA#48", 1600), "plener-stoly": ("SALAPLENEROWA#30", 1400),
    "ceremonia-las": ("SALAPLENEROWA#22", 1600), "ceremonia-goscie": ("SALAPLENEROWA#45", 1600), "las-brzozy": ("SALAPLENEROWA#41", 1400),
    "para-love": ("SALAPLENEROWA#86", 1400), "para-zachod": ("SALAPLENEROWA#14", 1400), "plener-lampki": ("SALAPLENEROWA#60", 1400),
    "komunia": ("KOMUNIA#36", 1600), "komunia-stoly": ("KOMUNIA#33", 1400), "komunia-desery": ("KOMUNIA#20", 1000), "komunia-dzieci": ("KOMUNIA#47", 1400),
    "kobieciarnia": ("kobieciarnia2026#9", 1600), "kobieciarnia-sala": ("kobieciarnia2026#6", 1400), "kobieciarnia-drinki": ("kobieciarnia2026#12", 1000),
    "kobieciarnia-taniec": ("kobieciarnia2026#37", 1400), "kobieciarnia-goscie": ("kobieciarnia2026#29", 1400),
    "walentynki": ("kolacjawalentynkowa2026#27", 1600), "walentynki-danie": ("kolacjawalentynkowa2026#4", 1000), "walentynki-stol": ("kolacjawalentynkowa2026#41", 1400),
    "walentynki-kuchnia": ("kolacjawalentynkowa2026#17", 1400),
}
DOMKI = {"domek-taras": "31", "domek-4": "38", "domek-8": "40", "domek-wnetrze": "34", "domek-sypialnia": "32", "domek-lazienka": "29",
         "domek-sauna": "37", "domek-stol": "36", "domek-drzwi": "41", "domek-antresola": "42", "domek-reczniki": "69", "domek-lampka": "39"}
def save(im, name, w):
    im = ImageOps.exif_transpose(im).convert("RGB")
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, f"{name}.webp"), quality=80, method=6); print(name, im.size)
for name, (key, w) in PICK.items():
    if not os.path.exists(os.path.join(OUT, f"{name}.webp")): save(Image.open(IDX[key]), name, w)
for name, n in DOMKI.items():
    if not os.path.exists(os.path.join(OUT, f"{name}.webp")): save(Image.open(os.path.join(IDO, f"{n}.jpg")), name, 1400)
