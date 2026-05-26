import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite-konfig för utvecklingsserver och production-build.
// — index.html i denna mapp är STANDALONE (laddar React från CDN och har
//   appen inline-kompilerad) — fungerar direkt i Chrome utan server.
// — För att utveckla med hot-reload: skapa en separat src/main.jsx som
//   importerar App.jsx, och ändra index.html till <script type="module" src="/src/main.jsx">.
// — För deploy till Vercel som statisk site: standalone-index.html räcker.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Bevarar samma standalone-struktur i build-output
    assetsInlineLimit: 100000000,
  },
})
