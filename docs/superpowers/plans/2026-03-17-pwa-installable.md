# PWA Instalable Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hacer que TraductorAI sea instalable en el home screen de móviles y desktop via manifest + service worker mínimo.

**Architecture:** Next.js App Router genera el manifest automáticamente desde `src/app/manifest.ts`. Un service worker vacío en `public/sw.js` satisface el requisito de Chrome para el install prompt. Un client component registra el SW en el root layout.

**Tech Stack:** Next.js 15 App Router (built-in manifest support), TypeScript strict, pnpm

---

## File Map

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `src/app/manifest.ts` | Crear | Manifest de la PWA — nombre, íconos, colores, display mode |
| `public/sw.js` | Crear | Service worker vacío — habilita install prompt en Chrome |
| `src/components/service-worker-register.tsx` | Crear | Client component que registra el SW en el browser |
| `src/app/layout.tsx` | Modificar | Montar `<ServiceWorkerRegister />` en el body |
| `next.config.ts` | Modificar | Security headers para `/sw.js` |
| `public/icon-192x192.png` | Manual | Ícono 192×192 — el usuario lo genera |
| `public/icon-512x512.png` | Manual | Ícono 512×512 — el usuario lo genera |

---

## Task 1: Generar los íconos (manual)

**Files:**
- Create: `public/icon-192x192.png`
- Create: `public/icon-512x512.png`

- [ ] **Step 1: Generar íconos en realfavicongenerator.net**

  Ir a https://realfavicongenerator.net, subir un logo o imagen de partida y descargar el paquete. Extraer los archivos y renombrarlos:
  - `android-chrome-192x192.png` → `public/icon-192x192.png`
  - `android-chrome-512x512.png` → `public/icon-512x512.png`

  Solo se necesitan esos dos archivos. Ignorar el resto del paquete.

- [ ] **Step 2: Verificar que los archivos existen**

  ```bash
  ls public/icon-192x192.png public/icon-512x512.png
  ```
  Expected: los dos paths listados sin error.

- [ ] **Step 3: Commit**

  ```bash
  git add public/icon-192x192.png public/icon-512x512.png
  git commit -m "feat: add PWA icons (192x192, 512x512)"
  ```

---

## Task 2: Crear el manifest

**Files:**
- Create: `src/app/manifest.ts`

- [ ] **Step 1: Crear el archivo**

  ```ts
  // src/app/manifest.ts
  import type { MetadataRoute } from 'next'

  export default function manifest(): MetadataRoute.Manifest {
    return {
      name: 'TraductorAI',
      short_name: 'TraductorAI',
      description: 'AI powered translator',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#171717',
      icons: [
        { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    }
  }
  ```

  Nota: `theme_color: '#171717'` es la conversión exacta de `--primary: oklch(0.205 0 0)` al espacio sRGB.

- [ ] **Step 2: Verificar que TypeScript compila sin errores**

  ```bash
  pnpm build
  ```
  Expected: build exitoso sin errores de tipo.

- [ ] **Step 3: Verificar que el manifest se sirve correctamente**

  Con `pnpm dev` corriendo, abrir http://localhost:3000/manifest.webmanifest en el browser.
  Expected: JSON válido con los campos name, icons, display, etc.

- [ ] **Step 4: Commit**

  ```bash
  git add src/app/manifest.ts
  git commit -m "feat: add PWA web app manifest"
  ```

---

## Task 3: Crear el service worker

**Files:**
- Create: `public/sw.js`

- [ ] **Step 1: Crear el archivo**

  ```js
  // public/sw.js

  // Service worker mínimo.
  // Chrome requiere un SW registrado para mostrar el install prompt (beforeinstallprompt).
  // Sin este archivo, la app es instalable en iOS Safari (solo requiere manifest),
  // pero Chrome desktop y Android no mostrarán el banner automático de instalación.
  ```

  Este archivo es intencionalmente vacío de lógica. No intercepta requests, no cachea nada.

- [ ] **Step 2: Verificar que el archivo se sirve desde la raíz**

  Con `pnpm dev` corriendo, abrir http://localhost:3000/sw.js en el browser.
  Expected: el contenido del archivo (los comments).

- [ ] **Step 3: Commit**

  ```bash
  git add public/sw.js
  git commit -m "feat: add minimal service worker for Chrome install prompt"
  ```

---

## Task 4: Crear el componente de registro del SW

**Files:**
- Create: `src/components/service-worker-register.tsx`

- [ ] **Step 1: Crear el componente**

  ```tsx
  // src/components/service-worker-register.tsx
  'use client'

  import { useEffect } from 'react'

  export function ServiceWorkerRegister() {
    useEffect(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
      }
    }, [])

    return null
  }
  ```

  - `'use client'` es obligatorio: usa `useEffect` que solo existe en el browser.
  - El guard `'serviceWorker' in navigator` evita errores en browsers que no lo soportan.
  - `return null`: sin UI, invisible para el usuario.

- [ ] **Step 2: Commit**

  ```bash
  git add src/components/service-worker-register.tsx
  git commit -m "feat: add ServiceWorkerRegister client component"
  ```

---

## Task 5: Montar el componente en el layout

**Files:**
- Modify: `src/app/layout.tsx`

El layout actual (`src/app/layout.tsx`) tiene esta estructura en el body:
```tsx
<body className={...}>
  <div className="flex flex-col min-h-screen">
    <Header />
    {children}
    <footer>...</footer>
  </div>
  <Toaster richColors visibleToasts={1} />
</body>
```

- [ ] **Step 1: Importar y montar `ServiceWorkerRegister`**

  Agregar el import junto a los otros imports de componentes:
  ```tsx
  import { ServiceWorkerRegister } from '@/components/service-worker-register'
  ```

  Agregar el componente dentro del `<body>`, junto a `<Toaster>`:
  ```tsx
  <Toaster richColors visibleToasts={1} />
  <ServiceWorkerRegister />
  ```

- [ ] **Step 2: Verificar que el build y el layout no tienen errores**

  ```bash
  pnpm build
  ```
  Expected: build exitoso.

- [ ] **Step 3: Verificar el registro en el browser**

  Con `pnpm dev` corriendo, abrir http://localhost:3000, abrir DevTools > Application > Service Workers.
  Expected: `sw.js` aparece como registrado con status "activated and is running".

- [ ] **Step 4: Commit**

  ```bash
  git add src/app/layout.tsx
  git commit -m "feat: register service worker in root layout"
  ```

---

## Task 6: Agregar security headers para el SW

**Files:**
- Modify: `next.config.ts`

El `next.config.ts` actual es:
```ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
}

export default nextConfig
```

- [ ] **Step 1: Agregar la función `headers`**

  ```ts
  import type { NextConfig } from "next"

  const nextConfig: NextConfig = {
    experimental: {
      optimizePackageImports: ["lucide-react"],
    },
    async headers() {
      return [
        {
          source: '/sw.js',
          headers: [
            { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
            { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          ],
        },
      ]
    },
  }

  export default nextConfig
  ```

  `Cache-Control: no-cache, no-store, must-revalidate` garantiza que el browser siempre descargue la versión más reciente del SW en cada deploy.

- [ ] **Step 2: Verificar que el build compila**

  ```bash
  pnpm build
  ```
  Expected: build exitoso sin errores de tipo en `next.config.ts`.

- [ ] **Step 3: Verificar los headers en dev**

  ```bash
  curl -I http://localhost:3000/sw.js
  ```
  Expected: respuesta incluye `Cache-Control: no-cache, no-store, must-revalidate`.

- [ ] **Step 4: Formatear con Biome y commitear**

  ```bash
  pnpm biome format --write next.config.ts
  git add next.config.ts
  git commit -m "feat: add security headers for service worker"
  ```

---

## Task 7: Verificación final

- [ ] **Step 1: Build de producción limpio**

  ```bash
  pnpm build
  ```
  Expected: build exitoso, sin warnings de tipo ni errores.

- [ ] **Step 2: Verificar el manifest en Chrome DevTools**

  Con `pnpm dev` corriendo, abrir Chrome > DevTools > Application > Manifest.
  Expected:
  - Name: `TraductorAI`
  - Icons: dos entradas (192×192 y 512×512) con preview visible
  - Display: `standalone`
  - Sin errores en la sección de Manifest

- [ ] **Step 3: Verificar el install prompt en Chrome**

  En Chrome desktop (requiere HTTPS o localhost), después de navegar a la app, la barra de direcciones debe mostrar el ícono de instalación (➕ o similar).

  Para probar con HTTPS local:
  ```bash
  pnpm dev --experimental-https
  ```

  Nota: Chrome aplica un "engagement heuristic" — el prompt puede tardar unos segundos en aparecer tras cargar la página por primera vez. Si no aparece inmediatamente, esperar o recargar.

- [ ] **Step 4: Verificar en Chrome DevTools > Lighthouse**

  Correr un audit de Lighthouse > Progressive Web App.
  Expected: pasa los criterios de installability (manifest válido + SW registrado).
  Nota: puede aparecer un warning sobre maskable icon — es esperado y está fuera de scope.
