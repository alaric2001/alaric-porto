# Bug Fix Log — Portfolio Alaric

Catatan error yang pernah muncul selama pengembangan proyek ini beserta cara mengatasinya.

---

## 1. Light Mode Toggle Tidak Berfungsi

**Error:**
Tombol toggle dark/light mode diklik tapi tampilan tidak berubah sama sekali.

**Penyebab:**
CSS override untuk light mode ditulis di dalam `@layer base` Tailwind. Layer ini memiliki spesifisitas lebih rendah dari utility class (`text-white`, `bg-slate-*`, dll), sehingga override tidak pernah menang di cascade.

**Solusi:**
Pindahkan semua override light mode ke **luar** `@layer` di `globals.css`. Selector di luar layer otomatis menang cascade tanpa perlu `!important`.

```css
/* SALAH — di dalam @layer, kalah dari utility */
@layer base {
  html:not(.dark) .text-white { color: #0f172a; }
}

/* BENAR — di luar @layer, menang cascade */
html:not(.dark) .text-white { color: #0f172a; }
```

Tambahan: buat CSS variable `--bg-page`, `--bg-glass-card`, dll di `:root` (dark) dan `html:not(.dark)` (light), lalu pakai `style={{ background: "var(--bg-page)" }}` pada elemen utama.

---

## 2. Cloud Build: IAM Permission Denied

**Error:**
```
ERROR: (gcloud.builds.submit) PERMISSION_DENIED: The caller does not have permission
```
Build gagal total, tidak bisa push image atau deploy ke Cloud Run.

**Penyebab:**
Service account default Cloud Build (`[PROJECT_NUMBER]-compute@developer.gserviceaccount.com`) tidak memiliki role yang cukup.

**Solusi:**
Tambahkan 4 role berikut ke service account tersebut via IAM Console:

| Role | Fungsi |
|---|---|
| Logs Writer | Bisa menulis build log |
| Artifact Registry Writer | Bisa push Docker image |
| Cloud Run Admin | Bisa deploy ke Cloud Run |
| Service Account User | Bisa bertindak sebagai service account |

---

## 3. Cloud Build: COPY Failed — Folder `public` Tidak Ada

**Error:**
```
COPY failed: stat app/public: file does not exist
```
Build Docker gagal di stage `COPY app/public ./public`.

**Penyebab:**
Folder `public/` kosong sehingga tidak ter-commit ke Git. Git tidak melacak folder kosong.

**Solusi:**
Buat file placeholder `.gitkeep` di dalam folder `public/` agar folder ikut ter-commit.

```bash
New-Item -ItemType File public/.gitkeep
git add public/.gitkeep
git commit -m "add public folder placeholder"
```

---

## 4. TypeScript: `MessageCircle` Icon Tidak Ditemukan

**Error:**
```
Module '"lucide-react"' has no exported member 'MessageCircle'
```

**Penyebab:**
Setelah mengganti icon WhatsApp dari `MessageCircle` ke inline SVG, import `MessageCircle` dihapus dari baris import — tapi nama `MessageCircle` masih dipakai di dalam array social links sebagai nilai `icon`.

**Solusi:**
Ganti referensi `icon: MessageCircle` di array dengan `icon: WhatsAppIcon` (komponen SVG inline yang sudah dibuat di atas file yang sama).

```tsx
// Salah — masih pakai MessageCircle di array padahal sudah tidak diimport
{ icon: MessageCircle, label: "WhatsApp", ... }

// Benar — pakai komponen inline SVG
{ icon: WhatsAppIcon, label: "WhatsApp", ... }
```

---

## 5. LangProvider: Generic Type Error

**Error:**
```
Type 'string' is not assignable to type 'keyof Translations'
```
TypeScript menolak penggunaan `t(section, key)` karena tipe generik terlalu ketat.

**Penyebab:**
Tipe `Translations` di-infer dari `as const` sehingga setiap key hanya bisa berupa literal string tertentu. Saat `t()` dipanggil dengan string dinamis, TypeScript tidak bisa memverifikasi.

**Solusi:**
Tambahkan alias tipe yang lebih longgar sebagai cast internal di `LangProvider`:

```ts
type TranslationDict = Record<string, Record<string, string>>;
const data = translations[lang] as TranslationDict;
```

---

## 6. AI Chat: `matchAll` Iterator Error

**Error:**
```
TypeError: result is not iterable
```
Terjadi di route `/api/ai-chat` saat mencoba ekstrak nomor resi dari pesan user.

**Penyebab:**
`String.prototype.matchAll()` mengembalikan `RegExpStringIterator` yang tidak bisa langsung di-spread atau di-`Array.from` di semua environment runtime Next.js.

**Solusi:**
Ganti `matchAll` dengan loop `exec` manual yang kompatibel di semua environment:

```ts
// Sebelum (bermasalah)
const matches = [...text.matchAll(/([A-Z]{2,3}\d{8,14})/g)];

// Sesudah (aman)
const matches: string[] = [];
const regex = /([A-Z]{2,3}\d{8,14})/g;
let m: RegExpExecArray | null;
while ((m = regex.exec(text)) !== null) {
  matches.push(m[1]);
}
```

---

## 7. `next.config`: `optimizeCss: true` Error

**Error:**
```
Error: Cannot find module 'critters'
```
Build gagal saat `experimental.optimizeCss: true` diaktifkan di `next.config.ts`.

**Penyebab:**
Opsi `optimizeCss` membutuhkan package `critters` yang tidak ter-install secara default di Next.js.

**Solusi:**
Hapus opsi `experimental.optimizeCss` dari `next.config.ts`. Tidak diperlukan untuk proyek ini.

```ts
// Hapus baris ini
experimental: {
  optimizeCss: true,
}
```

---

## 8. React: Cannot Update Component While Rendering Another

**Error:**
```
Warning: Cannot update a component (`AchievementProvider`) while rendering
a different component (`AIChatWidget`).
```

**Penyebab:**
Dua pelanggaran sekaligus:

1. Di `AchievementProvider.unlock()` — `setToast()` dipanggil di dalam updater callback `setUnlocked(prev => { setToast(...) })`. React melarang setState di dalam state updater karena updater harus berupa fungsi murni.

2. Di `AIChatWidget` — `unlock("conversationist")` dipanggil di dalam updater `setIsOpen(v => { unlock(); return !v })`, yang berarti state dari komponen lain (`AchievementProvider`) diupdate selama proses update komponen ini.

**Solusi:**

**Fix 1 — `AchievementProvider`:** Gunakan `useRef` sebagai pengecekan sinkron, lalu panggil `setUnlocked` dan `setToast` secara terpisah di luar updater:

```tsx
// Sebelum — setToast di dalam updater (SALAH)
const unlock = useCallback((id) => {
  setUnlocked((prev) => {
    if (prev.has(id)) return prev;
    setToast(achievement); // ← PELANGGARAN
    return new Set([...prev, id]);
  });
}, []);

// Sesudah — ref untuk cek sinkron, setState di luar updater (BENAR)
const unlockedRef = useRef(new Set());
const unlock = useCallback((id) => {
  if (unlockedRef.current.has(id)) return;
  unlockedRef.current = new Set([...unlockedRef.current, id]);
  setUnlocked(new Set(unlockedRef.current));
  setToast(ACHIEVEMENTS.find(a => a.id === id)!);
}, []);
```

**Fix 2 — `AIChatWidget`:** Pindahkan `unlock` ke luar dari updater `setIsOpen`:

```tsx
// Sebelum — unlock di dalam updater (SALAH)
onClick={() => { setIsOpen((v) => { if (!v) unlock("conversationist"); return !v; }); }}

// Sesudah — unlock di luar updater (BENAR)
onClick={() => { if (!isOpen) unlock("conversationist"); setIsOpen((v) => !v); }}
```

---

## 9. Modal Arsitektur: Overlay Terlalu Gelap di Light Mode

**Error:**
Tidak ada error konsol, tapi secara visual overlay modal (`bg-slate-950/80`) terasa sangat gelap di light mode dan warnanya tidak konsisten dengan tema.

**Penyebab:**
Class `bg-slate-950/80` dipakai di dua tempat — Navbar (bisa adaptif) dan modal overlay (harus tetap gelap). Di light mode Navbar perlu jadi terang, tapi override CSS juga mengenai overlay modal.

**Solusi:**
Ganti class overlay modal dari `bg-slate-950/80` menjadi `bg-black/50 backdrop-blur-md`. Warna `black` tidak terpengaruh override light mode dan tetap memberikan efek gelap yang sesuai untuk modal.

```tsx
// Sebelum
<div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />

// Sesudah
<div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
```
