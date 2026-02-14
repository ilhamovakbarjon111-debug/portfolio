# Portfolio Backend

Express + PostgreSQL. Profile, Statistics, Skills, Projects va Contact uchun to‘liq API.

## Jadvallar

| Jadval | Ma’lumot |
|--------|----------|
| **profile** | Til bo‘yicha (en, uz, ru): name, title, subtitle, about_p1, about_p2, footer_by |
| **statistics** | Bitta qator: projects, experience, clients, startups, use_auto_projects |
| **skills** | Ko‘nikmalar ro‘yxati (name, sort_order) |
| **projects** | Loyihalar: id, title, description, image, tags, live_url, code_url |
| **contact_messages** | Kontakt formasidan kelgan xabarlar |

## Sozlash

1. `cp .env.example .env`
2. `.env` da **ADMIN_PASSWORD** va **DATABASE_URL** ni to‘ldiring.
3. PostgreSQL da **schema.sql** ni ishga tushiring (barcha jadvallar yaratiladi).

## Ishga tushirish

```bash
npm install
npm run dev
```

Server: http://localhost:3001

## API (frontend bilan mos)

| Method | Path | Auth | Tavsif |
|--------|------|------|--------|
| POST | /api/admin-login | — | Parol → token |
| GET | /api/portfolio-data | — | Profile, Statistics, Skills, Projects birlashgan |
| POST | /api/portfolio-data | Bearer | Profile, Statistics, Skills, Projects saqlash |
| POST | /api/contact | — | Kontakt forma (name, phone, telegram, message) |
| GET | /api/contact-messages | Bearer | Xabarlar ro‘yxati |
| DELETE | /api/contact-messages?id=uuid | Bearer | Xabarni o‘chirish |

GET /api/portfolio-data quyidagi formatda qaytaradi (frontend o‘qiydi):

```json
{
  "ok": true,
  "data": {
    "profile": { "en": {...}, "uz": {...}, "ru": {...} },
    "stats": { "projects", "experience", "clients", "startups", "useAutoProjects" },
    "skills": [{ "name": "..." }],
    "projects": [{ "id", "title", "description", "image", "tags", "liveUrl", "codeUrl" }]
  }
}
```
