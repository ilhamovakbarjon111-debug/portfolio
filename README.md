# Portfolio — Akbarjon Ilhamov

Shaxsiy portfolio sayti. Frontend + Backend + PostgreSQL + Admin paneli.

## Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, React Router, Lucide icons
- **Backend**: Node.js, Express, PostgreSQL (lokal yoki Neon serverless)
- **Tillar**: O'zbek, Ingliz, Rus
- **Mavzu**: Dark/Light mode

## Struktura

```
Portfolio/
├── frontend/      # React + Vite ilova (Vercel'ga deploy qilish uchun)
├── backend/       # Express API (Railway/Render/Docker uchun)
└── README.md
```

## Tezkor boshlash

### 1. Backend

```bash
cd backend
cp .env.example .env
# .env ni tahrirlang — ADMIN_PASSWORD va DATABASE_URL ni o'rnating
npm install
npm run db:schema    # Postgres jadvallarini yaratadi
npm run dev          # http://localhost:3001
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

Frontend default'da `http://localhost:3001`'ga ulanadi. Boshqa URL kerak bo'lsa, `frontend/.env`'da `VITE_API_BASE` ni o'rnating.

## Asosiy funksiyalar

- ✅ 3 tilda kontent (UZ/EN/RU) — Navbar'dan tezkor o'zgartirish
- ✅ Dark / Light mode — toggle bilan
- ✅ Admin panel (`/admin`) — kontent va xabarlarni boshqarish
- ✅ Kontakt formasi — backendga saqlash + offline lokal fallback
- ✅ Rate limiting va brute-force himoyasi
- ✅ Multilingual CV (`/cv.html`) — UZ/EN/RU + PDF chop etish
- ✅ Animatsiyalar — Framer Motion + optimallashtirilgan particles
- ✅ Responsive — mobil va desktop'da bir xil yaxshi ko'rinadi
- ✅ SEO meta-teglar — Telegram/Facebook'da chiroyli preview

## Nima yangilangan (v1.1)

### Backend
- `.env.example` qo'shildi — yangi loyihada tezroq sozlash uchun
- **Lokal Postgres qo'llab-quvvatlanadi** (oldin faqat Neon ishlardi). `DATABASE_URL`'da `localhost` bo'lsa avtomatik `pg` ishlatiladi
- **Brute-force himoyasi** — admin login uchun 5 noto'g'ri urinishdan keyin 15 daqiqa lock
- **Rate limiting** — kontakt formasi uchun har 10 daqiqada max 5 ta xabar
- **Constant-time parol taqqoslash** — timing attack'lardan himoya
- **Input validation** — uzunlik chegaralari (ism 100, xabar 5000)
- **CORS** — `ALLOWED_ORIGINS` o'zgaruvchisi orqali boshqarish
- **Health check** — `/api/health` endpointi
- **Yaxshilangan loglar** — request va xato loglari

### CV
- **Sintaktik xatolar tuzatildi** — orphan `</aside>` teglar olib tashlandi
- **3 til to'liq** — UZ/EN/RU hammasida til va shaxsiy sifatlar bo'limi bor
- **PDF tugmasi UI'da** — ishlatuvchi ko'radi va bir bosishda chop etadi (oldin URL parametr orqali edi)
- **html2pdf.js olib tashlandi** — native `window.print()` ishlatiladi (ishonchliroq)
- **Camera AI tajribasi qo'shildi**
- **Toza print CSS** — PDF chop etilganda chiroyli ko'rinadi
- **Til tugmalari sticky toolbar'da**
- **Inline SVG ikonkalar** — tashqi kutubxona kerak emas

### Frontend
- Yetim `AdminPanel.jsx` o'chirildi (`AdminPage.jsx` allaqachon ishlatilardi)
- **Kontakt formasi** — endi telefon va telegram ixtiyoriy, faqat ism va xabar majburiy
- **Yaxshi xato/muvaffaqiyat ko'rsatish** — animatsiyali toast'lar, 429 va 400 status code'lar uchun aniq xabarlar
- **Hero CV tugmasi** — yangi tabda CV ochiladi (avtomatik chop etmaydi)
- **Footer** — Email va GitHub ikonkalari qo'shildi
- **AnimatedBackground** — mobil'da grid yashirin va kamroq particles (tezroq ishlash uchun)
- **Projects** — bo'sh URL'lar yashiriladi, `loading="lazy"` rasmlar uchun
- **Real loyihalar** — Camera AI, Portfolio, Admin Dashboard, n8n workflows
- **SEO meta-teglar** — `index.html`'da OpenGraph va Twitter cards
- **`scroll-margin-top`** — bo'limlar navbar ostida qolib ketmaydi
- **`prefers-reduced-motion`** — accessibility uchun
- **Custom scrollbar** — gradient bilan

## Deploy

### Frontend (Vercel)
1. Frontend papkasini Vercel'ga ulang
2. Build command: `npm run build`
3. Output directory: `dist`
4. Environment: `VITE_API_BASE=https://your-backend.example.com`

### Backend (Railway / Render / Fly.io)
1. Backend papkasini ulang
2. Environment'da `ADMIN_PASSWORD`, `DATABASE_URL`, `ALLOWED_ORIGINS` ni o'rnating
3. Start command: `npm start`
4. `npm run db:schema` ni bir marta ishga tushiring (jadvallarni yaratish)

### Backend (Docker)
```bash
cd backend
docker build -t portfolio-backend .
docker run -p 3001:3001 --env-file .env portfolio-backend
```

## Admin paneli

`/admin` URL'iga o'ting va parolni kiriting (`.env`'dagi `ADMIN_PASSWORD`).

Admin paneldan:
- Loyihalarni qo'shish/o'chirish
- Tajribalarni boshqarish
- Kontakt xabarlarini ko'rish/o'chirish
- Sayt kontentini tahrirlash

## Litsenziya

Shaxsiy loyiha — © Akbarjon Ilhamov, 2026
