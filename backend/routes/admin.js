import { Router } from 'express'
import { createToken } from '../lib/auth.js'
import { config } from '../config.js'

const router = Router()

router.post('/admin-login', (req, res) => {
  const password = typeof req.body?.password === 'string' ? req.body.password.trim() : ''
  if (!password || password !== config.adminPassword) {
    return res.status(401).json({ success: false, ok: false, error: 'Invalid password' })
  }
  const token = createToken(config.adminPassword)
  res.json({ success: true, ok: true, token })
})

export default router
