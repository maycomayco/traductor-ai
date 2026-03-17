# PWA Instalable — TraductorAI

**Fecha:** 2026-03-17
**Branch:** add-support-PWA
**Alcance:** PWA instalable (opción A). Sin offline, sin push notifications.

## Objetivo

Permitir que TraductorAI sea instalable en el home screen de dispositivos móviles y desktop, usando las primitivas nativas de Next.js App Router. Sin dependencias nuevas.

## Archivos a crear

### `src/app/manifest.ts`

Manifest generado con el tipo built-in `MetadataRoute.Manifest` de Next.js. Next.js auto-registra el manifest en el `<head>` cuando este archivo existe.

```ts
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

Colores derivados del esquema actual:
- `background_color: #ffffff` ← `--background: oklch(1 0 0)`
- `theme_color: #171717` ← `--primary: oklch(0.205 0 0)` (conversión exacta a sRGB)

### `public/sw.js`

Service worker vacío. Su única función es satisfacer el requisito de Chrome para disparar el evento `beforeinstallprompt` y mostrar el banner de instalación. Sin caching, sin interceptación de requests.

```js
// Service worker mínimo.
// Chrome requiere un SW registrado para mostrar el install prompt (beforeinstallprompt).
// Sin este archivo, la app es instalable en iOS Safari (solo requiere manifest),
// pero Chrome desktop y Android no mostrarán el banner automático de instalación.
```

### `src/components/service-worker-register.tsx`

Client component que registra el SW una vez que el DOM está listo. Se monta en el root layout. No expone UI — es invisible para el usuario.

```tsx
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

### Íconos

El usuario genera los archivos `public/icon-192x192.png` y `public/icon-512x512.png` manualmente usando [realfavicongenerator.net](https://realfavicongenerator.net).

## Archivos a modificar

### `src/app/layout.tsx`

Agregar `<ServiceWorkerRegister />` dentro del `<body>`. Al ser un client component sin UI, no afecta el render del servidor.

### `next.config.ts`

Agregar security headers específicos para `/sw.js`:

```ts
// En next.config.ts, dentro del objeto NextConfig:
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
```

`Cache-Control: no-cache` garantiza que el browser siempre busque la versión más reciente del SW en cada deploy.

## Lo que NO se implementa

- Sin caching de assets ni offline support
- Sin push notifications
- Sin `beforeinstallprompt` personalizado (no es cross-browser)
- Sin `InstallPrompt` component (iOS puede instalarlo vía share sheet)
- Sin ícono `maskable` (Lighthouse lo marcaría como warning, pero no bloquea la instalación — fuera de scope)

## Criterios de éxito

- La app aparece como instalable en Chrome (desktop y Android)
- La app aparece como instalable en iOS Safari vía share sheet
- El manifest es válido (verificable en Chrome DevTools > Application > Manifest)
- El SW se registra sin errores en consola
