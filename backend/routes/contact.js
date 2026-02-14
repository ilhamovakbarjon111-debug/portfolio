import { Router } from 'express'
import { getDb } from '../lib/db.js'
import { requireAdmin } from '../middleware/auth.js'
import { requireDb } from '../middleware/db.js'

const router = Router()

router.post('/', requireDb, async (req, res) => {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : ''
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : ''
  if (!name || !message) {
    return res.status(400).json({ success: false, ok: false, error: 'Name and message required' })
  }
  const phone = typeof req.body?.phone === 'string' ? req.body.phone.trim() : ''
  const telegram = typeof req.body?.telegram === 'string' ? req.body.telegram.trim() : ''
  const sql = getDb()
  try {
    await sql`
      INSERT INTO contact_messages (name, phone, telegram, message)
      VALUES (${name}, ${phone}, ${telegram}, ${message})
    `
    res.json({ success: true, ok: true })
  } catch (err) {
    res.status(500).json({ success: false, ok: false, error: err.message })
  }
})

router.get('/', requireAdmin, requireDb, async (req, res) => {
  const sql = getDb()
  try {
    const rows = await sql`
      SELECT id, name, phone, telegram, message, created_at
      FROM contact_messages
      ORDER BY created_at DESC
    `
    res.json({ success: true, ok: true, messages: rows ?? [] })
  } catch (err) {
    res.status(500).json({ success: false, ok: false, error: err.message })
  }
})

router.delete('/', requireAdmin, requireDb, async (req, res) => {
  const id = req.query?.id
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ success: false, ok: false, error: 'Id required' })
  }
  const sql = getDb()
  try {
    await sql`DELETE FROM contact_messages WHERE id = ${id}`
    res.json({ success: true, ok: true })
  } catch (err) {
    res.status(500).json({ success: false, ok: false, error: err.message })
  }
})

export default router
