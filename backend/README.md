# Portfolio Backend

Express + PostgreSQL. API: admin login, kontakt xabarlari, portfolio ma’lumotlari.

## Sozlash

1. `.env.example` ni nusxalab `.env` yarating.
2. `ADMIN_PASSWORD` — admin panel paroli.
3. `DATABASE_URL` — PostgreSQL connection string (Neon: https://neon.tech).
4. PostgreSQL da `schema.sql` ni ishga tushiring.

## Ishga tushirish

```bash
npm install
npm run dev
```

Server: http://localhost:3001

## API

- `POST /api/admin-login` — body: `{ "password": "..." }` → `{ "ok": true, "token": "..." }`
- `POST /api/contact` — body: name, phone, telegram, message
- `GET /api/contact-messages` — header: `Authorization: Bearer <token>`
- `DELETE /api/contact-messages?id=<uuid>` — header: `Authorization: Bearer <token>`
- `GET /api/portfolio-data` — ommaviy
- `POST /api/portfolio-data` — body: overrides JSON, header: `Authorization: Bearer <token>`
