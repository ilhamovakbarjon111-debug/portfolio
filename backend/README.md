# Backend — Portfolio API

Node.js (Express) + PostgreSQL backend. Lokal Postgres va Neon serverless ikkalasini qo'llab-quvvatlaydi.

## Endpointlar

| Metod | Yo'l | Vazifa | Auth |
|-------|------|--------|------|
| GET | `/api/health` | Health check | — |
| POST | `/api/admin-login` | Admin parol bilan kirish | — |
| GET | `/api/portfolio-data` | Portfolio ma'lumotlarini olish | — |
| POST | `/api/portfolio-data` | Portfolio ma'lumotlarini yangilash | Admin |
| POST | `/api/contact` | Kontakt formadan xabar yuborish | — |
| GET | `/api/contact-messages` | Barcha xabarlarni olish | Admin |
| DELETE | `/api/contact-messages?id=...` | Xabarni o'chirish | Admin |

## O'rnatish

```bash
cd backend
cp .env.example .env
# .env ni tahrirlang (parol, DB URL)
npm install
npm run db:schema   # Jadvallarni yaratish
npm run dev         # http://localhost:3001
```

## Environment o'zgaruvchilar (`.env`)

| O'zgaruvchi | Tavsif | Misol |
|-------------|--------|-------|
| `PORT` | Server porti | `3001` |
| `ADMIN_PASSWORD` | Admin paroli | `mySecretPass!` |
| `DATABASE_URL` | Postgres URL | `postgresql://postgres:pwd@localhost:5432/portfolio?sslmode=disable` |
| `ALLOWED_ORIGINS` | CORS uchun ruxsat etilgan domenlar (vergul bilan) | `http://localhost:5173,https://example.com` |

## Xavfsizlik xususiyatlari

- ✅ **Brute-force himoyasi** — admin login uchun 5 noto'g'ri urinishdan keyin 15 daqiqa lock
- ✅ **Rate limiting** — har bir IP dan har 10 daqiqada max 5 ta kontakt xabari
- ✅ **Constant-time parol taqqoslash** — timing attack'lardan himoya
- ✅ **Input validation** — uzunlik chegaralari (ism 100, xabar 5000 belgi)
- ✅ **CORS** — `ALLOWED_ORIGINS` orqali boshqarish
- ✅ **HMAC token** — admin authentication

## Deploy

### Railway / Render / Fly.io

Environment'da quyidagilarni o'rnating:
- `ADMIN_PASSWORD`
- `DATABASE_URL`
- `ALLOWED_ORIGINS=https://your-frontend.vercel.app`

`PORT` avtomatik olinadi. `npm start` buyrug'i ishlatiladi.

### Docker

```bash
docker build -t portfolio-backend .
docker run -p 3001:3001 --env-file .env portfolio-backend
```
