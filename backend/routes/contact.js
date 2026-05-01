import { Router } from 'express'
import { getDb } from '../lib/db.js'
import { requireAdmin } from '../middleware/auth.js'
import { requireDb } from '../middleware/db.js'

const router = Router()

// Sodda IP-rate limiter: har bir IP — har 10 daqiqada max 5 ta xabar
const rateMap = new Map()
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

function rateLimit(req, res, next) {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown'
  const now = Date.now()
  const entry = rateMap.get(ip) || { count: 0, resetAt: now + WINDOW_MS }
  if (now > entry.resetAt) {
    entry.count = 0
    entry.resetAt = now + WINDOW_MS
  }
  entry.count += 1
  rateMap.set(ip, entry)
  if (entry.count > MAX_REQUESTS) {
    const waitMin = Math.ceil((entry.resetAt - now) / 60000)
    return res.status(429).json({
      success: false,
      ok: false,
      error: `Juda ko'p xabar. ${waitMin} daqiqadan keyin urinib ko'ring.`,
    })
  }
  next()
}

// Eskirgan IP yozuvlarini tozalash (har 30 daqiqa)
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(ip)
  }
}, 30 * 60 * 1000)

router.post('/contact', rateLimit, requireDb, async (req, res) => {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : ''
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : ''
  const phone = typeof req.body?.phone === 'string' ? req.body.phone.trim() : ''
  const telegram = typeof req.body?.telegram === 'string' ? req.body.telegram.trim() : ''

  // Validatsiya
  if (!name || !message) {
    return res.status(400).json({ success: false, ok: false, error: 'Ism va xabar majburiy' })
  }
  if (name.length > 100) {
    return res.status(400).json({ success: false, ok: false, error: 'Ism juda uzun (max 100)' })
  }
  if (message.length > 5000) {
    return res.status(400).json({ success: false, ok: false, error: 'Xabar juda uzun (max 5000)' })
  }
  if (phone.length > 50 || telegram.length > 100) {
    return res.status(400).json({ success: false, ok: false, error: 'Maydon juda uzun' })
  }

  const sql = getDb()
  try {
    await sql`
      INSERT INTO contact_messages (name, phone, telegram, message)
      VALUES (${name}, ${phone}, ${telegram}, ${message})
    `
    res.json({ success: true, ok: true })
  } catch (err) {
    console.error('❌ Contact insert error:', err.message)
    res.status(500).json({ success: false, ok: false, error: 'Xabar saqlanmadi' })
  }
})

router.get('/contact-messages', requireAdmin, requireDb, async (_req, res) => {
  const sql = getDb()
  try {
    const rows = await sql`
      SELECT id, name, phone, telegram, message, created_at
      FROM contact_messages
      ORDER BY created_at DESC
    `
    res.json({ success: true, ok: true, messages: rows ?? [] })
  } catch (err) {
    console.error('❌ Contact list error:', err.message)
    res.status(500).json({ success: false, ok: false, error: 'Xabarlar olinmadi' })
  }
})

router.delete('/contact-messages', requireAdmin, requireDb, async (req, res) => {
  const id = req.query?.id
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ success: false, ok: false, error: 'Id required' })
  }
  const sql = getDb()
  try {
    await sql`DELETE FROM contact_messages WHERE id = ${id}`
    res.json({ success: true, ok: true })
  } catch (err) {
    console.error('❌ Contact delete error:', err.message)
    res.status(500).json({ success: false, ok: false, error: 'Xabar o\'chirilmadi' })
  }
})

export default router
