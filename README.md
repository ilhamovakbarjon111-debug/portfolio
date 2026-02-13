# Portfolio — Akbarjon Ilhamov

Zamonaviy, chiroyli portfolio sayt. Dark/Light rejim, 3 tilda (EN, UZ, RU), animatsiyalar va loyihalar bo‘limi.

## Xususiyatlar

- **Dizayn**: Gradient matn, glassmorphism navbar, yumshoq animatsiyalar
- **Tillar**: English, O‘zbek, Русский (sahifa yuqorisidagi EN | UZ | RU tugmalari)
- **Mavzu**: Dark / Light rejim (tugma navbar da)
- **Bo‘limlar**: Hero, About, Projects, Contact
- **Loyihalar**: O‘z loyihalaringizni `src/data/projects.js` da o‘zgartiring
- **Ko‘nikmalar**: `src/data/skills.js` da ro‘yxatni tahrirlang

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda: http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Loyihalarni qo‘shish

`src/data/projects.js` faylida har bir loyiha uchun:

- `title` — nomi
- `description` — qisqacha tavsif
- `image` — rasmlar URL (yoki `/img/project1.jpg`)
- `tags` — texnologiyalar ro‘yxati
- `liveUrl` — sayt havolasi
- `codeUrl` — GitHub havolasi
