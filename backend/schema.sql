-- Portfolio backend – Profile, Statistics, Skills, Projects, Contact
-- PostgreSQL da bajarish (pgAdmin yoki Neon SQL Editor).

-- 1. Contact – sayt formasidan kelgan xabarlar
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  telegram TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Profile – til bo‘yicha (en, uz, ru)
CREATE TABLE IF NOT EXISTS profile (
  lang VARCHAR(5) PRIMARY KEY,
  name TEXT,
  title TEXT,
  subtitle TEXT,
  about_p1 TEXT,
  about_p2 TEXT,
  footer_by TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO profile (lang) VALUES ('en'), ('uz'), ('ru')
ON CONFLICT (lang) DO NOTHING;

-- 3. Statistics – bitta qator
CREATE TABLE IF NOT EXISTS statistics (
  id INT PRIMARY KEY DEFAULT 1,
  projects INT DEFAULT 0,
  experience INT DEFAULT 0,
  clients INT DEFAULT 0,
  startups INT DEFAULT 0,
  use_auto_projects BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT single_stat CHECK (id = 1)
);

INSERT INTO statistics (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- 4. Skills – ko‘nikmalar ro‘yxati
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- 5. Projects – loyihalar
CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  description TEXT DEFAULT '',
  image TEXT DEFAULT '',
  tags JSONB DEFAULT '[]',
  live_url TEXT DEFAULT '',
  code_url TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);
