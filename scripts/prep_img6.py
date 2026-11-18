"""Szósta partia (18.11.2026): zdjęcia z niewyszarzonej części 'zmiany na stronce.docx' (Sale, Przyjęcia, ceremonie)."""
import glob, os
from PIL import Image, ImageOps
R = r"C:\Users\olo_p\Downloads\wetransfer_avocado-zdjecia_2026-10-29_0759"
K = r"C:\Users\olo_p\Downloads\avocado-wt-1117\kochana"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "img")
def g(root, pat):
    r = sorted(glob.glob(os.path.join(root, pat))); assert r, pat; return r[0]
def save(path, name, w=1400, q=80):
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, f"{name}.webp"), quality=q, method=6); print(name, im.size)
save(g(K, "*00308.jpg"), "gkom-7")                       # komunie: zamiast powtórzonego zdjęcia
save(g(R, "Dzie*/Avocado00139.jpg"), "sb-139"); save(g(R, "SALA BANKIETOWA/*00116.jpg"), "sb-116"); save(g(R, "SALA BANKIETOWA/*00119.jpg"), "sb-119")
save(g(R, "kobieciarnia 2026/avocado4.jpg"), "sb-a4"); save(g(R, "kobieciarnia 2026/avocado50.jpg"), "sb-a50"); save(g(R, "kolacja degustacyjna 1/Highlights/*(44).jpg"), "sb-d44")
save(g(K, "KOCHANA FOTOGRAFIA-19.jpg"), "pl-k19"); save(g(K, "KOCHANA FOTOGRAFIA-09.jpg"), "pl-k09"); save(g(K, "KOCHANA FOTOGRAFIA-196.jpg"), "pl-k196")
save(g(K, "KOCHANA FOTOGRAFIA-145.jpg"), "cer-k145"); save(g(K, "KOCHANA FOTOGRAFIA-094.jpg"), "cer-k094")
