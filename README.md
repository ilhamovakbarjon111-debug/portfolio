# Portfolio — Akbarjon Ilhamov

Backend (PostgreSQL) va frontend (React/Vite) alohida papkalarda.

## Loyiha tuzilishi

- **backend/** — Node.js (Express) + PostgreSQL. API: admin login, kontakt, portfolio ma’lumotlari.
- **frontend/** — React, Vite, Tailwind. Portfolio sayt va admin panel.

## Ishga tushirish

### 1. Backend

```bash
cd backend
cp .env.example .env   # DATABASE_URL va ADMIN_PASSWORD ni to‘ldiring
npm install
npm run dev
```

Backend: http://localhost:3001

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173 (Vite `/api` ni backend’ga proxy qiladi)

### 3. PostgreSQL jadval

Neon yoki boshqa Postgres’da `backend/schema.sql` ni ishga tushiring.

## Deploy

- **Backend** — Railway, Render, Fly.io va h.k. (Node + env: PORT, ADMIN_PASSWORD, DATABASE_URL)
- **Frontend** — Vercel. Env: `VITE_API_URL` = backend URL (masalan `https://your-backend.railway.app`)
