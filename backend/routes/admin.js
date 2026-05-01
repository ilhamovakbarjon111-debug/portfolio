import { Router } from 'express'
import crypto from 'crypto'
import { createToken } from '../lib/auth.js'
import { config } from '../config.js'

const router = Router()

// Brute-force himoyasi: bir IP dan ketma-ket muvaffaqiyatsiz urinishlar
const failedMap = new Map()
const MAX_FAILS = 5
const LOCK_MS = 15 * 60 * 1000 // 15 daqiqa

function loginGuard(req, res, next) {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown'
  const entry = failedMap.get(ip)
  if (entry && entry.count >= MAX_FAILS && Date.now() < entry.lockedUntil) {
    const waitMin = Math.ceil((entry.lockedUntil - Date.now()) / 60000)
    return res.status(429).json({
      success: false,
      ok: false,
      error: `Juda ko'p urinish. ${waitMin} daqiqadan keyin urinib ko'ring.`,
    })
  }
  next()
}

function recordFail(ip) {
  const entry = failedMap.get(ip) || { count: 0, lockedUntil: 0 }
  entry.count += 1
  if (entry.count >= MAX_FAILS) entry.lockedUntil = Date.now() + LOCK_MS
  failedMap.set(ip, entry)
}

function clearFails(ip) {
  failedMap.delete(ip)
}

// Constant-time taqqoslash — timing attack'lardan himoya
function safeEqual(a, b) {
  const ba = Buffer.from(String(a))
  const bb = Buffer.from(String(b))
  if (ba.length !== bb.length) return false
  return crypto.timingSafeEqual(ba, bb)
}

router.post('/admin-login', loginGuard, (req, res) => {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown'
  const password = typeof req.body?.password === 'string' ? req.body.password.trim() : ''
  if (!password || !safeEqual(password, config.adminPassword)) {
    recordFail(ip)
    return res.status(401).json({ success: false, ok: false, error: 'Noto\'g\'ri parol' })
  }
  clearFails(ip)
  const token = createToken(config.adminPassword)
  res.json({ success: true, ok: true, token })
})

export default router
