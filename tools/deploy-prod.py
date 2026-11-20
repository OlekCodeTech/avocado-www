"""Publikuje wersję produkcyjną Avocado na gałęzi „produkcja” w GitHubie (repo OlekCodeTech/avocado-www).

Hosting OVH pobiera pliki z tej gałęzi (wdrożenie Git przy domenie restauracjaavocado.pl).
Skrypt buduje dist/ (tools/build-prod.py) i dokłada na gałąź „produkcja” jeden commit z gotowymi
plikami strony. Gałąź nie zawiera źródeł i ma ciągłą historię (bez wymuszonego nadpisywania),
żeby serwer mógł ją zwyczajnie pobrać (git pull). Przy pierwszym uruchomieniu zakłada gałąź.

Użycie:  python tools/deploy-prod.py            (przekierowanie na https wyłączone)
         python tools/deploy-prod.py --https    (gdy certyfikat działa dla obu nazw)
Potem: panel OVH -> Hosting -> Moje strony -> www.restauracjaavocado.pl -> wdrożenie Git.
"""
import shutil, subprocess, sys, tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BRANCH = "produkcja"


def git(*args, cwd, check=True):
    r = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True, encoding="utf-8")
    if check and r.returncode:
        sys.exit(f"git {' '.join(args)}: {r.stderr}")
    return r.stdout.strip()


def writable(fn, path, exc):
    Path(path).chmod(0o700)  # .git ma pliki tylko do odczytu – bez tego Windows nie usunie katalogu
    fn(path)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    dirty = git("status", "--porcelain", cwd=ROOT)
    if dirty:
        sys.exit("Są niezapisane zmiany – najpierw commit, żeby produkcja odpowiadała historii:\n" + dirty)
    args = [sys.executable, str(ROOT / "tools" / "build-prod.py")] + (["--https"] if "--https" in sys.argv else [])
    subprocess.run(args, check=True)
    remote = git("remote", "get-url", "origin", cwd=ROOT)
    source = git("rev-parse", "--short", "HEAD", cwd=ROOT)
    exists = bool(git("ls-remote", "--heads", remote, BRANCH, cwd=ROOT))

    tmp = Path(tempfile.mkdtemp(prefix="avocado-prod-"))
    work = tmp / "site"
    try:
        if exists:
            subprocess.run(["git", "clone", "-q", "--depth", "1", "--branch", BRANCH, remote, str(work)], check=True)
        else:
            work.mkdir()
            git("init", "-q", "-b", BRANCH, cwd=work)
            git("remote", "add", "origin", remote, cwd=work)
        git("config", "core.autocrlf", "false", cwd=work)
        for child in work.iterdir():
            if child.name == ".git":
                continue
            shutil.rmtree(child, onexc=writable) if child.is_dir() else child.unlink()
        shutil.copytree(ROOT / "dist", work, dirs_exist_ok=True)
        git("add", "-A", cwd=work)
        if not git("status", "--porcelain", cwd=work):
            print(f"Gałąź „{BRANCH}” już odpowiada commitowi {source} – nic do wypchnięcia.")
            return
        git("commit", "-q", "-m", f"restauracjaavocado.pl: wersja produkcyjna z commita {source}", cwd=work)
        subprocess.run(["git", "push", "-q", "origin", BRANCH], cwd=work, check=True)
    finally:
        shutil.rmtree(tmp, onexc=writable)
    print(f"Gałąź „{BRANCH}” = commit {source}. Teraz wdrożenie Git w panelu OVH.")


if __name__ == "__main__":
    main()
