# Rallar — Järnvägsplattform

Mobil-först B2B-app för järnvägsarbete (avrop, tidsrapportering, avvikelser,
chatt, planering). Demo i React med 4 roller.

## Filer

| Fil | Roll |
|-----|------|
| `index.html` | Standalone-app. Öppnas direkt i Chrome. React från CDN, hela appen inline-kompilerad. |
| `App.jsx` | Källkoden i JSX (~11 800 rader, ~700 KB). För editering eller om du vill bygga om via Vite. |
| `package.json` | Vite + React-dependencies (om du vill köra `npm run dev` lokalt). |
| `vite.config.js` | Vite-konfig (för utveckling med hot-reload). |
| `vercel.json` | Vercel-deploy-konfig (statisk site, ingen build). |

## Öppna direkt i webbläsaren (ingen server behövs)

1. Dubbelklicka på `index.html` — öppnas i Chrome
2. Inläsningsskärm ~1 sekund medan React laddas från CDN
3. Logga in som något av rollerna: **Beställare** (Anna), **Arbetsledare** (Magnus), eller **Arbetare** (Marcus)

> **Notera:** Internet krävs första gången för att hämta React + DM Sans-fonten
> från CDN. Efter det cachar webbläsaren dessa.

## Deploya till Vercel — steg för steg

### Alternativ A: GitHub → Vercel (rekommenderat)

1. **Skapa GitHub-repo** med dessa filer:
   ```bash
   cd rallar-app
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create rallar-app --public --source=. --push
   ```
   (eller skapa repo manuellt på github.com och pusha)

2. **Gå till [vercel.com/new](https://vercel.com/new)** och logga in med GitHub

3. **Klicka "Import" på ditt repo**

4. **Konfigurationsskärm — Vercel detekterar `vercel.json` automatiskt**:
   - Framework Preset: **Other** (eller None)
   - Build Command: lämna tomt
   - Output Directory: `.`
   - Install Command: lämna tomt

5. **Klicka "Deploy"** — tar ~10 sekunder

6. **Klart!** Du får en URL som `rallar-app-xxx.vercel.app` att skicka

### Alternativ B: Vercel CLI (snabbast)

```bash
npm install -g vercel
cd rallar-app
vercel
```

Följ promptarna. När det frågar om "Want to override the settings?" → välj **No**.
Vercel använder `vercel.json` automatiskt. Du får en URL direkt.

### Alternativ C: Drag & drop (enklast, ingen Git)

1. Gå till [vercel.com/new](https://vercel.com/new)
2. Scrolla ner till "Or, deploy without a Git repository"
3. Dra hela `rallar-app/`-mappen
4. Vercel deployar omedelbart som statisk site

## Custom domain på Vercel

I Vercel-dashboarden → Project → Settings → Domains → Add Domain.
Lägg till din egen domän (om du har en) eller använd den gratis `.vercel.app`-länken.

## Utveckling med Vite (valfritt)

Om du vill ha hot-reload medan du editar `App.jsx`:

```bash
npm install
npm run dev
```

> **OBS:** Detta kräver att du byter ut `index.html` mot en Vite-version som
> importerar `App.jsx` som modul, och skapar en `src/main.jsx`-entry. Se
> kommentarer i `vite.config.js`. För enkel deploy räcker standalone-versionen.

## Inloggningsroller (demo)

- **Beställare (foretag):** Anna Bergström, Lindqvist Rail AB
- **Arbetsledare:** Magnus Holm, NordRail AB
- **Arbetare:** Marcus Berg, NordRail AB

Alla data är hårdkodade i `App.jsx` för demo. Ingen backend.

## Browsersupport

Chrome 90+, Safari 14+, Firefox 88+, Edge 90+. Mobil-först-design.
