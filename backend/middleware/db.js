import { getDb } from '../lib/db.js'

export function requireDb(req, res, next) {
  if (!getDb()) {
    return res.status(503).json({ success: false, ok: false, error: 'Service unavailable' })
  }
  next()
}
