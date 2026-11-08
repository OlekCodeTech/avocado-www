"""Wybór i konwersja zdjęć od klienta do public/img (WebP).

Użycie: python scripts/prep_img.py <index.json ze stykówek>
Klucz = nazwa folderu (końcówka) + '#' + numer ze stykówki. Istniejące pliki są pomijane.
"""
import json, os, sys
from PIL import Image, ImageOps

IDX = json.load(open(sys.argv[1], encoding="utf8"))
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "img")

PICK = {  # nazwa: (klucz, max szerokość)
    # strona główna
    "hero": ("SALABANKIETO#69", 2000), "hero-2": ("ślubaj#11", 2000), "hero-3": ("SALABANKIETO#64", 2000),
    "wesela": ("ślubaj#11", 1200), "przyjecia": ("SALABANKIETO#16", 1200), "wydarzenia": ("SALABANKIETO#29", 1200),
    "sala-bankietowa": ("SALABANKIETO#3", 1200), "sala-plenerowa": ("ślubaj#0", 1200),
    "kuchnia-zespol": ("jedzenie#45", 1400),
    "bank-wieczor": ("SALABANKIETO#89", 1600), "bank-dzien": ("SALABANKIETO#79", 1600),
    "plener-wieczor": ("ślubaj#13", 1600), "plener-dzien": ("ślubaj#5", 1600),
    "d1": ("jedzenie#6", 800), "d2": ("jedzenie#12", 800), "d3": ("jedzenie#35", 800), "d4": ("jedzenie#38", 800),
    "d5": ("jedzenie#44", 800), "d6": ("jedzenie#24", 800), "d7": ("jedzenie#46", 800),
    "g1": ("weseleGabiik#3", 1000), "g2": ("weseleGabiik#22", 1000), "g3": ("ślubaj#9", 1000), "g4": ("SALABANKIETO#64", 1000),
    "g5": ("jedzenie#38", 1000), "g6": ("ślubaj#13", 1000), "g7": ("SALABANKIETO#18", 1000), "g8": ("weseleGabiik#28", 1000),
    "wejscie": ("SALABANKIETO#48", 1200),
    # obiekt / sale
    "budynek": ("SALABANKIETO#159", 1800), "budynek-ogrod": ("SALABANKIETO#165", 1800),
    "plac-zabaw": ("SALABANKIETO#164", 1400), "ceremonia": ("SALABANKIETO#172", 1200),
    "sala-szeroka": ("SALABANKIETO#170", 2000), "sala-dlugie-stoly": ("SALABANKIETO#173", 1600),
    "sala-wesele-noc": ("SALABANKIETO#156", 2000), "sala-biala": ("SALABANKIETO#155", 1600),
    "plener-zima": ("Dzieńotwarty#130", 1024), "plener-zima-2": ("Dzieńotwarty#133", 1024),
    "neon": ("SALABANKIETO#182", 1400), "para-tort": ("SALABANKIETO#187", 1400), "para-wejscie": ("SALABANKIETO#191", 1400),
    "stol-dlugi": ("SALABANKIETO#22", 1400), "firma-stol": ("SALABANKIETO#5", 1400), "bufet": ("Dzieńotwarty#111", 1024),
    # przyjęcia
    "chrzciny": ("CHRZTY#15", 1600), "chrzciny-2": ("CHRZTY#11", 1200), "dzieci-brzozy": ("CHRZTY#19", 1200),
    "dzieci-plac": ("CHRZTY#20", 1200), "osiemnastka": ("SALABANKIETO#150", 1400), "slodki-stol": ("CHRZTY#4", 1000),
    # wydarzenia
    "sylwester": ("sylwester202#38", 2000), "sylwester-2": ("sylwester202#6", 1400), "sylwester-zespol": ("sylwester202#41", 1400),
    "sylwester-stol": ("sylwester202#27", 1200),
}


def find(key):
    folder, n = key.split("#")
    tail = folder[-6:]
    return next(k for k in IDX if k.endswith("#" + n) and tail in k)


os.makedirs(OUT, exist_ok=True)
for name, (key, w) in PICK.items():
    dst = os.path.join(OUT, f"{name}.webp")
    if os.path.exists(dst):
        continue
    im = ImageOps.exif_transpose(Image.open(IDX[find(key)])).convert("RGB")
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(dst, quality=80, method=6)
    print(name, im.size)
