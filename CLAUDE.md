# Portfolio Alaric — CLAUDE.md

## Project Overview
Personal portfolio website for Alaric Rasendriya Aniko (Fullstack Developer, M.Sc. Information Systems, Telkom University). Built with Next.js 15 App Router + TypeScript. Deployed to Google Cloud Run via Cloud Build.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint check
npx tsc --noEmit # TypeScript check (no output = clean)
```

## Architecture

```
app/
├── page.tsx              # Server Component — root page, imports portfolioData directly
├── layout.tsx            # Root layout: ThemeProvider → AuthProvider → LangProvider
├── globals.css           # Tailwind base + CSS variables (dark/light tokens) + light mode overrides
├── icon.tsx              # Auto-generated favicon (32×32, "AR" monogram)
├── apple-icon.tsx        # Apple touch icon (180×180)
├── admin/page.tsx        # Admin login page (RBAC demo) - sementara tidak digunakan
├── api/
│   ├── ai-chat/route.ts  # AI chat POST — IBM Granite simulation, regex entity extraction
│   ├── auth/route.ts     # POST login / DELETE logout → sets portfolio_role HTTP-only cookie
│   └── profile/route.ts  # GET profile data (SSR backup)
├── components/           # All UI components (Client Components)
│   ├── Navbar.tsx        # Top nav with lang/theme toggles + auth state
│   ├── Hero.tsx          # Landing section: photo, name, social links, CV download
│   ├── Skills.tsx        # Technical skills grid
│   ├── Experience.tsx    # Work experience timeline
│   ├── Dokumentasi.tsx   # Projects cards + architecture modal (AnimatePresence)
│   ├── Publications.tsx  # Academic publications list with external URLs
│   ├── Certifications.tsx# Certifications sorted by newest date
│   ├── Education.tsx     # Education background
│   ├── OtherPortfolio.tsx# External project links (clickable motion.a cards)
│   ├── AIChatWidget.tsx  # Floating AI chat (IBM Granite simulation)
│   ├── AuthProvider.tsx  # Role state in localStorage + React Context
│   ├── LangProvider.tsx  # ID/EN lang toggle via React Context + Reducer
│   ├── LangToggle.tsx    # Language switcher button
│   └── ThemeToggle.tsx   # Dark/light mode button
├── lib/
│   ├── data.ts           # Single source of truth — all portfolio content + bilingual fields
│   └── translations.ts   # ID/EN translation strings (as const)
└── types/index.ts        # All TypeScript interfaces
```

## Key Conventions

### Data flow
All portfolio content lives in `app/lib/data.ts` as `portfolioData`. Page.tsx imports it directly (SSR — no fetch). Components receive data as props.

### Bilingual pattern
Every content field that needs translation has two versions: `field` (Indonesian) and `fieldEn` (English). UI picks the right one via `lang === "en" ? item.fieldEn : item.field`. Translation strings for UI labels are in `translations.ts`, accessed via `t(section, key)` from `useLang()`.

### Theme system
Dark/light mode via `next-themes` + Tailwind `darkMode: "class"`. CSS custom properties in `globals.css`:
- `:root` = dark mode defaults (`--bg-page: #020617`, `--bg-glass-card: rgba(15,23,42,0.6)`)  
- `html:not(.dark)` = light mode overrides  
- Light mode overrides for Tailwind classes live at bottom of `globals.css` using `html:not(.dark) .class-name` selectors (no `!important` needed — these are outside `@layer` so they win cascade)

### Auth (RBAC demo)
`AuthProvider` manages role in localStorage + React Context. HTTP-only cookie `portfolio_role` set by `/api/auth`. Admin credentials: `admin@alaric.dev` / `AlaricAdmin2025` (demo only — hardcoded, not production auth).

### AI Chat
`/api/ai-chat` route simulates IBM Granite agentic behavior: regex entity extraction for tracking numbers (`/([A-Z]{2,3}\d{8,14})/g`) and phone numbers, bilingual responses based on `lang` param.

### Icons
- Use `lucide-react` for all UI icons (pinned v0.468.0 — has Linkedin/Github/Gitlab)
- Brand icons not in lucide-react (e.g. WhatsApp) use inline SVG components defined at the top of the file — do NOT add CDN links or new icon libraries

### CV / Static Assets
- Static files in `public/` are served at root path by Next.js (e.g. `public/foo.pdf` → `/foo.pdf`)
- CV download button in `Hero.tsx` uses `href="/Alaric_curriculum vitae_2026_.pdf"` + HTML `download` attribute — triggers browser download, not tab open
- Profile photo: `public/Alaric casual.png`, rendered via `next/image` in `Hero.tsx`

## Styling Rules
- Utility classes: `.glass`, `.glass-card`, `.gradient-text`, `.badge-*`, `.section-padding` defined in `globals.css`
- Colors: blue-600/violet-600 gradient as primary accent throughout
- Cards always use `glass-card` class — do not hardcode card backgrounds
- Animations: Framer Motion `whileInView` + `viewport={{ once: true }}` for all section entries

## Adding Content
To add a new project: update `portfolioData.projects` in `data.ts` and add architecture data in `portfolioData.architectures` using the same key.

To add a new section: create component in `components/`, add nav link to `Navbar.tsx` NAV_LINKS, add translations to `translations.ts` (both `id` and `en` blocks), import and add to `page.tsx` section array.

To add a new publication: add entry to `portfolioData.publications` in `data.ts` with `url` field. Certifications are ordered newest-first by date in `data.ts`.

## Deployment
- **Platform**: Google Cloud Run (asia-southeast2)
- **CI/CD**: Cloud Build trigger on push to `main`
- **Container port**: 3080
- **Build**: Multi-stage Docker — deps → builder → runner (non-root `nextjs` user)
- Next.js `output: "standalone"` is required for the Docker runner stage
