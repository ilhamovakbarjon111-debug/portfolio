-- PostgreSQL (Neon yoki boshqa) da bajarish.
-- Neon: https://console.neon.tech → SQL Editor → paste va Run

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  telegram TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_overrides (
  id INT PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO portfolio_overrides (id, data) VALUES (1, '{}')
ON CONFLICT (id) DO NOTHING;
