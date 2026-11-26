"""Wersja produkcyjna na https://www.restauracjaavocado.pl (hosting OVH).

  python tools/build-prod.py      -> dist/ (gotowe pliki) + export/avocado-produkcja.zip

Robi: build Next z NEXT_PUBLIC_PROD=1 (indeksowanie włączone, bez basePath), usuwa robocze podstrony,
dokłada .htaccess (https, www, przekierowania starych adresów z Webflow), robots.txt, sitemap.xml,
404.html i plik weryfikacji Google Search Console (jeśli ustawiony).
"""
import os, shutil, subprocess, sys, zipfile, datetime, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT, DIST, EXPORT = ROOT / "out", ROOT / "dist", ROOT / "export"
SITE = "https://www.restauracjaavocado.pl"
GOOGLE_VERIFICATION = "google96e0791bcf3ff8f5.html"   # plik z Search Console konta OlekCodeTech (ten sam co Bifor) – zostawić na stałe
DROP = ["zdjecia"]          # robocze podstrony, których nie publikujemy
NOINDEX = ("catering/dziekujemy",)  # strony celowo poza Google (podziękowanie po zamówieniu – konwersja Meta)

# stare adresy z Webflow -> nowe (301)
REDIRECTS = {
    "imprezy-firmowe": "/przyjecia/#firmowe",
    "sala-bankietowa": "/sale/#bankietowa",
    "sala-plenerowa": "/sale/#plenerowa",
    "kuchnia": "/o-nas/#kuchnia",
    "dziekujemy": "/kontakt/",
    "testimoniale/.*": "/#opinie",
    "domki": "/noclegi/",
    "polityka-prywatnosci.html": "/polityka-prywatnosci/",
    "galeria/klaudia-daniel": "/galeria/klaudia-michal/",  # 23.11.2026 poprawka imienia pana młodego
}

HTACCESS = r"""# Avocado — www.restauracjaavocado.pl (OVH)
Options -Indexes
DirectoryIndex index.html
AddDefaultCharset UTF-8
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
RewriteEngine On

# lista sum kontrolnych skryptu wgrywania (tools/deploy-prod.py) – nie do pobrania z sieci
RewriteRule ^\.avocado-manifest\.json$ - [F,L]

# --- HTTPS i jedna wersja adresu (z www, jak na dawnej stronie) ---
# Przekierowanie na https włączyć (odkomentować) dopiero, gdy certyfikat działa dla obu nazw.
#HTTPS#RewriteCond %{SERVER_PORT} ^80$
#HTTPS#RewriteCond %{HTTPS} !=on
#HTTPS#RewriteCond %{HTTP:X-Forwarded-Proto} !https
#HTTPS#RewriteRule ^ https://www.restauracjaavocado.pl%{REQUEST_URI} [R=301,L,NE]
RewriteCond %{HTTP_HOST} ^restauracjaavocado\.pl$ [NC]
RewriteRule ^ %{REQUEST_SCHEME}://www.restauracjaavocado.pl%{REQUEST_URI} [R=301,L,NE]

# --- brakujący ukośnik na końcu (zamiast mod_dir, który za proxy OVH dopisuje „:443” do adresu) ---
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^(.*[^/])$ %{REQUEST_SCHEME}://www.restauracjaavocado.pl/$1/ [R=301,L,NE]

# --- stare adresy z Webflow ---
{redirects}
</IfModule>

<IfModule mod_headers.c>
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set X-Frame-Options "SAMEORIGIN"
<FilesMatch "\.(js|css|woff2)$">
Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
<FilesMatch "\.(webp|jpg|png|svg|mp4|ico)$">
Header set Cache-Control "public, max-age=2592000"
</FilesMatch>
<FilesMatch "\.(html|txt|php|xml)$">
Header set Cache-Control "no-cache"
</FilesMatch>
</IfModule>

<IfModule mod_mime.c>
AddType font/woff2 .woff2
AddType image/webp .webp
AddType image/svg+xml .svg
AddType video/mp4 .mp4
</IfModule>

<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml application/json text/plain application/xml
</IfModule>
"""

def run(cmd, env=None):
    print(">", " ".join(cmd)); r = subprocess.run(cmd, cwd=ROOT, env=env, shell=os.name == "nt")
    if r.returncode: sys.exit(r.returncode)

def main(https=False):
    env = dict(os.environ, NEXT_PUBLIC_PROD="1", NEXT_PUBLIC_BASE_PATH="")
    run(["npm", "run", "build"], env)
    # czyścimy zawartość, nie sam katalog – Windows nie usunie katalogu, w którym stoi czyjś terminal
    if DIST.exists():
        for child in DIST.iterdir():
            shutil.rmtree(child) if child.is_dir() else child.unlink()
    shutil.copytree(OUT, DIST, dirs_exist_ok=True)
    for d in DROP:
        p = DIST / d
        if p.exists(): shutil.rmtree(p)
    # 404 jako zwykły plik (Next generuje 404.html i katalog _not-found)
    if not (DIST / "404.html").exists() and (DIST / "404" / "index.html").exists():
        shutil.copy(DIST / "404" / "index.html", DIST / "404.html")
    red = "\n".join(f"RewriteRule ^{src}/?$ %{{REQUEST_SCHEME}}://www.restauracjaavocado.pl{dst} [R=301,L,NE]" for src, dst in REDIRECTS.items())
    ht = HTACCESS.replace("{redirects}", red)
    if https: ht = ht.replace("#HTTPS#", "").replace("%{REQUEST_SCHEME}", "https")
    (DIST / ".htaccess").write_text(ht, encoding="utf-8", newline="\n")
    (DIST / "robots.txt").write_text(f"User-agent: *\nAllow: /\nDisallow: /send.php\n\nSitemap: {SITE}/sitemap.xml\n", encoding="utf-8", newline="\n")
    # sitemap: wszystkie strony HTML poza 404 i roboczymi
    today = datetime.date.today().isoformat()
    urls = []
    for f in sorted(DIST.rglob("index.html")):
        rel = f.parent.relative_to(DIST).as_posix()
        if rel.startswith(("_", "404") + NOINDEX) or rel.split("/")[0] in DROP: continue
        urls.append("/" if rel == "." else f"/{rel}/")
    xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    xml += [f"  <url><loc>{SITE}{u}</loc><lastmod>{today}</lastmod></url>" for u in urls]
    xml.append("</urlset>")
    (DIST / "sitemap.xml").write_text("\n".join(xml) + "\n", encoding="utf-8", newline="\n")
    if GOOGLE_VERIFICATION:
        (DIST / GOOGLE_VERIFICATION).write_text(f"google-site-verification: {GOOGLE_VERIFICATION}", encoding="utf-8")
    # kontrola: produkcja nie może mieć noindex ani adresów podglądu
    bad = [str(f.relative_to(DIST)) for f in DIST.rglob("*.html") if not f.relative_to(DIST).as_posix().startswith(("404", "_not-found") + NOINDEX) and (b"noindex" in f.read_bytes() or b"/avocado-www/" in f.read_bytes())]
    if bad: sys.exit(f"BLAD: noindex/basePath podglądu w: {bad[:5]}")
    EXPORT.mkdir(exist_ok=True)
    z = EXPORT / "avocado-produkcja.zip"
    with zipfile.ZipFile(z, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in sorted(DIST.rglob("*")):
            if f.is_file(): zf.write(f, f.relative_to(DIST).as_posix())
    with zipfile.ZipFile(z) as zf: assert zf.testzip() is None
    print(f"OK: {len(urls)} stron w sitemap, dist/ gotowe, {z} ({z.stat().st_size // 1024 // 1024} MB)")

if __name__ == "__main__":
    main(https="--https" in sys.argv)
