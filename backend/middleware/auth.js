import { verifyToken, getAuthToken } from '../lib/auth.js'
import { config } from '../config.js'

export function requireAdmin(req, res, next) {
  const token = getAuthToken(req)
  if (!verifyToken(token, config.adminPassword)) {
    return res.status(401).json({ success: false, ok: false, error: 'Unauthorized' })
  }
  next()
}
