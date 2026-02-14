import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createToken, verifyToken, getAuthToken } from './lib/auth.js'
import { getDb } from './lib/db.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: true }))
app.use(express.json({ limit: '50mb' })) // loyiha rasmlari base64 bo‘lganda katta bo‘ladi

const requireAdmin = (req, res) => {
  const token = getAuthToken(req)
  const secret = process.env.ADMIN_PASSWORD || 'admin'
  if (!verifyToken(token, secret)) {
    res.status(401).json({ ok: false })
    return false
  }
  return true
}

// POST /api/admin-login
app.post('/api/admin-login', (req, res) => {
  const serverPassword = process.env.ADMIN_PASSWORD || 'admin'
  const { password } = req.body || {}
  const trimmed = typeof password === 'string' ? password.trim() : ''
  if (trimmed && trimmed === serverPassword) {
    const token = createToken(serverPassword)
    return res.json({ ok: true, token })
  }
  res.status(401).json({ ok: false })
})

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  const sql = getDb()
  if (!sql) return res.status(503).json({ ok: false, error: 'Database not configured' })
  const { name, phone, telegram, message } = req.body || {}
  const row = {
    name: typeof name === 'string' ? name.trim() : '',
    phone: typeof phone === 'string' ? phone.trim() : '',
    telegram: typeof telegram === 'string' ? telegram.trim() : '',
    message: typeof message === 'string' ? message.trim() : '',
  }
  if (!row.name || !row.message) return res.status(400).json({ ok: false })
  try {
    await sql`
      INSERT INTO contact_messages (name, phone, telegram, message)
      VALUES (${row.name}, ${row.phone}, ${row.telegram}, ${row.message})
    `
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

// GET /api/contact-messages  |  DELETE /api/contact-messages?id=...
app.get('/api/contact-messages', async (req, res) => {
  if (!requireAdmin(req, res)) return
  const sql = getDb()
  if (!sql) return res.status(503).json({ ok: false })
  try {
    const rows = await sql`
      SELECT id, name, phone, telegram, message, created_at
      FROM contact_messages
      ORDER BY created_at DESC
    `
    res.json({ ok: true, messages: rows || [] })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

app.delete('/api/contact-messages', async (req, res) => {
  if (!requireAdmin(req, res)) return
  const { id } = req.query || {}
  if (!id) return res.status(400).json({ ok: false })
  const sql = getDb()
  if (!sql) return res.status(503).json({ ok: false })
  try {
    await sql`DELETE FROM contact_messages WHERE id = ${id}`
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

// GET /api/portfolio-data  |  POST /api/portfolio-data
app.get('/api/portfolio-data', async (req, res) => {
  const sql = getDb()
  if (!sql) return res.json({ ok: true, data: {} }) // bazasiz bo‘lsa default kontent
  try {
    const rows = await sql`SELECT data FROM portfolio_overrides WHERE id = 1`
    const payload = rows?.[0]?.data || {}
    res.json({ ok: true, data: payload })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

app.post('/api/portfolio-data', async (req, res) => {
  if (!requireAdmin(req, res)) return
  const sql = getDb()
  if (!sql) return res.status(503).json({ ok: false })
  const body = req.body || {}
  try {
    await sql`
      INSERT INTO portfolio_overrides (id, data, updated_at)
      VALUES (1, ${JSON.stringify(body)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET
        data = EXCLUDED.data,
        updated_at = EXCLUDED.updated_at
    `
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Backend http://localhost:${PORT}`)
  if (!process.env.DATABASE_URL) console.warn('Ogohlantirish: DATABASE_URL o‘rnatilmagan – kontakt va admin saqlash ishlamaydi.')
  if (!process.env.ADMIN_PASSWORD) console.warn('Ogohlantirish: ADMIN_PASSWORD o‘rnatilmagan – default parol: admin')
})
