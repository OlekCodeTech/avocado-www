"""Wgrywa wersję produkcyjną Avocado na hosting OVH (yzudqhv.cluster100 – ten sam co Bifor), katalog ./avocado.

Hosting Bifora ma już jedyne dozwolone powiązanie Git (Bifor), więc Avocado wgrywamy przez SFTP.
Skrypt buduje dist/ (tools/build-prod.py) i synchronizuje go z katalogiem na serwerze:
wysyła tylko zmienione pliki (lista sum kontrolnych w .avocado-manifest.json na serwerze)
i usuwa ze serwera pliki, których nie ma już w dist/.

Hasło FTP/SFTP konta yzudqhv: zmienna środowiskowa AVOCADO_SFTP_PASS albo pytanie w terminalu.

Użycie:  python tools/deploy-prod.py               (przekierowanie na https wyłączone)
         python tools/deploy-prod.py --https       (gdy certyfikat działa dla obu nazw)
         python tools/deploy-prod.py --no-build    (wgraj istniejący dist/ bez budowania)
         python tools/deploy-prod.py --dry-run     (pokaż, co by się zmieniło)
"""
import getpass, hashlib, json, os, posixpath, stat, subprocess, sys
from pathlib import Path

import paramiko

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
HOST, PORT, USER = "ssh.cluster100.hosting.ovh.net", 22, "yzudqhv"
REMOTE = "avocado"  # względem katalogu domowego konta (/home/yzudqhv/avocado)
MANIFEST = ".avocado-manifest.json"


def sha(p: Path) -> str:
    h = hashlib.sha1()
    with p.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def local_files() -> dict[str, str]:
    return {p.relative_to(DIST).as_posix(): sha(p) for p in sorted(DIST.rglob("*")) if p.is_file()}


def mkdirs(sftp, path, made):
    parts = path.split("/")
    for i in range(1, len(parts) + 1):
        d = "/".join(parts[:i])
        if d in made:
            continue
        try:
            sftp.stat(d)
        except FileNotFoundError:
            sftp.mkdir(d)
        made.add(d)


def remote_walk(sftp, base):
    """Wszystkie pliki pod katalogiem base (ścieżki względne)."""
    out, stack = [], [""]
    while stack:
        rel = stack.pop()
        for e in sftp.listdir_attr(posixpath.join(base, rel) if rel else base):
            r = posixpath.join(rel, e.filename) if rel else e.filename
            (stack.append(r) if stat.S_ISDIR(e.st_mode) else out.append(r))
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    dry = "--dry-run" in sys.argv
    if "--no-build" not in sys.argv:
        args = [sys.executable, str(ROOT / "tools" / "build-prod.py")] + (["--https"] if "--https" in sys.argv else [])
        subprocess.run(args, check=True)
    if not (DIST / "index.html").exists():
        sys.exit("Brak dist/index.html – najpierw zbuduj stronę.")

    pw = os.environ.get("AVOCADO_SFTP_PASS") or getpass.getpass(f"Hasło SFTP dla {USER}@{HOST}: ")
    t = paramiko.Transport((HOST, PORT))
    try:
        t.connect(username=USER, password=pw)
    except paramiko.AuthenticationException:
        t.close()
        sys.exit(f"Złe hasło dla {USER} – nic nie zostało wgrane. (Nowe hasło: OVH -> hosting yzudqhv -> FTP - SSH -> ołówek; działa po kilku minutach.)")
    sftp = paramiko.SFTPClient.from_transport(t)
    try:
        made = set()
        mkdirs(sftp, REMOTE, made)
        try:
            with sftp.open(f"{REMOTE}/{MANIFEST}") as f:
                old = json.loads(f.read())
        except (FileNotFoundError, ValueError):
            old = {}
        new = local_files()
        upload = [p for p, h in new.items() if old.get(p) != h]
        remote = set(remote_walk(sftp, REMOTE)) - {MANIFEST}
        delete = sorted(remote - set(new))
        print(f"Do wysłania: {len(upload)} plików, do usunięcia: {len(delete)}, bez zmian: {len(new) - len(upload)}")
        if dry:
            for p in upload[:50]:
                print("  +", p)
            for p in delete[:50]:
                print("  -", p)
            return
        # .htaccess na końcu – żeby przekierowania nie wskazywały na pliki, których jeszcze nie ma
        upload.sort(key=lambda p: p == ".htaccess")
        for i, p in enumerate(upload, 1):
            mkdirs(sftp, posixpath.dirname(f"{REMOTE}/{p}"), made)
            sftp.put(str(DIST / p), f"{REMOTE}/{p}")
            if i % 50 == 0 or i == len(upload):
                print(f"  wysłano {i}/{len(upload)}")
        for p in delete:
            sftp.remove(f"{REMOTE}/{p}")
        with sftp.open(f"{REMOTE}/{MANIFEST}", "w") as f:
            f.write(json.dumps(new))
    finally:
        sftp.close()
        t.close()
    print("Gotowe – strona na serwerze odpowiada dist/.")


if __name__ == "__main__":
    main()
