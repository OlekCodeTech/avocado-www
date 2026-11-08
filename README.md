# Avocado – nowa strona (restauracjaavocado.pl)

Next.js 16 (static export) + motion + lenis. Makieta strony głównej.

- `npm run dev` – podgląd lokalny
- `npm run build` – statyczny eksport do `out/`
- Podgląd online: https://olekcodetech.github.io/avocado-www/ (push na `main` → GitHub Actions)
- Zdjęcia: `scripts/prep_img.py` wybiera i konwertuje do WebP z paczki od klienta (`public/img`).

Do zrobienia przed wdrożeniem: podpięcie formularza (planer), zdjęcia domków, weryfikacja odległości na mapce, zdjęcie `robots: noindex` w `src/app/layout.tsx`, baner cookies.
