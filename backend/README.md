# Portfolio Backend

Express + PostgreSQL. Admin login, kontakt xabarlari, portfolio ma’lumotlari.

## Talablar

- Node.js 18+
- PostgreSQL (lokal yoki Neon va h.k.)

## Sozlash

1. `cp .env.example .env`
2. `.env` da **ADMIN_PASSWORD** va **DATABASE_URL** ni to‘ldiring (ikkalasi majburiy).
3. PostgreSQL da `schema.sql` ni ishga tushiring.

## Ishga tushirish

```bash
npm install
npm run dev
```

Server: http://localhost:3001

## Tuzilish

- `config.js` — konfiguratsiya, env tekshiruvi
- `lib/auth.js` — token yaratish/tekshirish
- `lib/db.js` — PostgreSQL (Neon driver)
- `middleware/auth.js` — admin token tekshiruvi
- `middleware/db.js` — bazaga ulanish tekshiruvi
- `routes/admin.js` — POST /api/admin-login
- `routes/contact.js` — POST /api/contact, GET/DELETE /api/contact-messages
- `routes/portfolio.js` — GET/POST /api/portfolio-data

## API

| Method | Path | Auth | Tavsif |
|--------|------|------|--------|
| POST | /api/admin-login | — | Body: `{ "password": "..." }` → `{ "ok": true, "token": "..." }` |
| POST | /api/contact | — | Body: name, phone?, telegram?, message |
| GET | /api/contact-messages | Bearer | Xabarlar ro‘yxati |
| DELETE | /api/contact-messages?id=uuid | Bearer | Xabarni o‘chirish |
| GET | /api/portfolio-data | — | Portfolio overrides |
| POST | /api/portfolio-data | Bearer | Portfolio saqlash |
