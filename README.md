# Alaric Rasendriya Aniko — Portfolio

> 🇮🇩 [Bahasa Indonesia](#bahasa-indonesia) · 🇬🇧 [English](#english)

---

## Bahasa Indonesia

Website portofolio pribadi yang dibangun dengan **Next.js 15 App Router**, TypeScript, Tailwind CSS, dan Framer Motion. Di-deploy ke Google Cloud Run.

### Fitur

- **Bilingual (ID / EN)** — toggle bahasa penuh dengan React Context + Reducer
- **Dark / Light mode** — next-themes + sistem CSS variable token
- **AI Chat Widget** — simulasi IBM Granite dengan ekstraksi entitas
- **Modal Arsitektur Teknis** — dokumentasi mendalam untuk setiap proyek
- **SSR** — pemuatan data Server Component, tanpa fetch waterfall di sisi klien
- **Progressive Web App** — meta PWA, apple-icon, favicon via Next.js image generation
- **Dockerized** — multi-stage build, di-deploy ke Cloud Run via Cloud Build CI/CD

### Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 15 (App Router) |
| Bahasa | TypeScript 5 |
| Styling | Tailwind CSS v3 + CSS variables kustom |
| Animasi | Framer Motion v11 |
| Ikon | lucide-react |
| Tema | next-themes |
| Deployment | Google Cloud Run (asia-southeast2) |
| CI/CD | Google Cloud Build (trigger GitHub) |

### Memulai

```bash
# Install dependensi
npm install

# Jalankan server development
npm run dev
# → http://localhost:3000

# Cek TypeScript
npx tsc --noEmit

# Build produksi
npm run build
```

### Struktur Proyek

```
app/
├── page.tsx              # Halaman utama (Server Component)
├── layout.tsx            # Root layout dengan providers
├── globals.css           # Gaya global + token tema
├── admin/                # Halaman login admin
├── api/
│   ├── ai-chat/          # Endpoint asisten AI
│   └── auth/             # Endpoint autentikasi
├── components/           # Komponen UI
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Dokumentasi.tsx   # Proyek + modal arsitektur
│   ├── Publications.tsx
│   ├── Certifications.tsx
│   ├── Education.tsx
│   ├── OtherPortfolio.tsx
│   ├── AIChatWidget.tsx
│   ├── AuthProvider.tsx
│   ├── LangProvider.tsx
│   ├── LangToggle.tsx
│   └── ThemeToggle.tsx
└── lib/
    ├── data.ts            # Seluruh konten portofolio
    └── translations.ts    # String UI ID/EN
```

### Environment

Tidak ada environment variable yang diperlukan. Kredensial admin di-hardcode hanya untuk keperluan demo (`admin@alaric.dev` / `AlaricAdmin2025`).

### Docker & Cloud Run

```bash
# Build image secara lokal
docker build -t alaric-porto .

# Jalankan secara lokal
docker run -p 3080:3080 alaric-porto
# → http://localhost:3080
```

Cloud Build otomatis trigger pada setiap push ke branch `main`.

### Lisensi

© 2026 Alaric Rasendriya Aniko. Seluruh hak cipta dilindungi.

---

## English

Personal portfolio website built with **Next.js 15 App Router**, TypeScript, Tailwind CSS, and Framer Motion. Deployed to Google Cloud Run.

### Features

- **Bilingual (ID / EN)** — full language toggle with React Context + Reducer
- **Dark / Light mode** — next-themes + CSS variable token system
- **AI Chat Widget** — IBM Granite simulation with entity extraction (tracking numbers, phone numbers)
- **Technical Architecture Modal** — deep-dive docs for each project
- **SSR** — Server Component data loading, no client-side fetch waterfall
- **Progressive Web App ready** — PWA meta, apple-icon, favicon via Next.js image generation
- **Dockerized** — multi-stage build, deployed to Cloud Run via Cloud Build CI/CD

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v3 + custom CSS variables |
| Animation | Framer Motion v11 |
| Icons | lucide-react |
| Theme | next-themes |
| Deployment | Google Cloud Run (asia-southeast2) |
| CI/CD | Google Cloud Build (GitHub trigger) |

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Type check
npx tsc --noEmit

# Production build
npm run build
```

### Project Structure

```
app/
├── page.tsx              # Root page (Server Component)
├── layout.tsx            # Root layout with providers
├── globals.css           # Global styles + theme tokens
├── admin/                # Admin login page
├── api/
│   ├── ai-chat/          # AI assistant endpoint
│   └── auth/             # Authentication endpoint
├── components/           # UI components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Dokumentasi.tsx   # Projects + architecture modal
│   ├── Publications.tsx
│   ├── Certifications.tsx
│   ├── Education.tsx
│   ├── OtherPortfolio.tsx
│   ├── AIChatWidget.tsx
│   ├── AuthProvider.tsx
│   ├── LangProvider.tsx
│   ├── LangToggle.tsx
│   └── ThemeToggle.tsx
└── lib/
    ├── data.ts            # All portfolio content
    └── translations.ts    # ID/EN UI strings
```

### Environment

No environment variables required. Admin credentials are hardcoded for demo purposes only (`admin@alaric.dev` / `AlaricAdmin2025`).

### Docker & Cloud Run

```bash
# Build image locally
docker build -t alaric-porto .

# Run locally
docker run -p 3080:3080 alaric-porto
# → http://localhost:3080
```

Cloud Build automatically triggers on every push to `main` branch.

### License

© 2026 Alaric Rasendriya Aniko. All rights reserved.
