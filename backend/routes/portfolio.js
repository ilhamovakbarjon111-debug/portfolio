import { Router } from 'express'
import { getDb } from '../lib/db.js'
import { requireAdmin } from '../middleware/auth.js'
import { requireDb } from '../middleware/db.js'

const router = Router()

router.get('/', requireDb, async (req, res) => {
  const sql = getDb()
  try {
    const rows = await sql`SELECT data FROM portfolio_overrides WHERE id = 1`
    const data = rows?.[0]?.data ?? {}
    res.json({ success: true, ok: true, data })
  } catch (err) {
    res.status(500).json({ success: false, ok: false, error: err.message })
  }
})

router.post('/', requireAdmin, requireDb, async (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {}
  const sql = getDb()
  try {
    await sql`
      INSERT INTO portfolio_overrides (id, data, updated_at)
      VALUES (1, ${JSON.stringify(body)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET
        data = EXCLUDED.data,
        updated_at = EXCLUDED.updated_at
    `
    res.json({ success: true, ok: true })
  } catch (err) {
    res.status(500).json({ success: false, ok: false, error: err.message })
  }
})

export default router
