// Default loyihalar — admin panel orqali tahrirlanadi
// (Backend bog'langan bo'lsa, DB dan keladi)
export const projects = [
  {
    id: 1,
    title: 'Camera AI',
    description: 'AI yordamida foto va videografiyani o\'rganish uchun mobil ilova. React Native (Expo), Node.js + Express, PostgreSQL, Anthropic Claude API.',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80',
    tags: ['React Native', 'Node.js', 'PostgreSQL', 'Claude AI'],
    liveUrl: '',
    codeUrl: '',
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'Shaxsiy portfolio sayti — React, Vite, Tailwind, Framer Motion. 3 til, dark mode, admin panel va kontakt formasi.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    tags: ['React', 'Vite', 'Tailwind', 'PostgreSQL'],
    liveUrl: '',
    codeUrl: 'https://github.com/akbarjon-ilhamov',
  },
  {
    id: 3,
    title: 'Admin Dashboard',
    description: 'Real-time admin panel — kontakt xabarlarini ko\'rish, portfolio kontentini tahrirlash, statistikani boshqarish.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['React', 'Express', 'JWT', 'REST API'],
    liveUrl: '',
    codeUrl: '',
  },
  {
    id: 4,
    title: 'n8n Automation Workflows',
    description: 'No-code/low-code avtomatlashtirish — Luma AI orqali video generatsiya va sosial media uchun avtomatik post.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    tags: ['n8n', 'Luma AI', 'Automation', 'API'],
    liveUrl: '',
    codeUrl: '',
  },
]
