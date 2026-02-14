import { Router } from 'express'
import { requireAdmin } from '../middleware/auth.js'
import { requireDb } from '../middleware/db.js'
import { getPortfolioData, setPortfolioData } from '../services/portfolio.js'

const router = Router()

router.get('/', requireDb, async (req, res) => {
  try {
    const data = await getPortfolioData()
    if (!data) return res.status(503).json({ success: false, ok: false, error: 'Service unavailable' })
    res.json({ success: true, ok: true, data })
  } catch (err) {
    res.status(500).json({ success: false, ok: false, error: err.message })
  }
})

router.post('/', requireAdmin, requireDb, async (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {}
  try {
    await setPortfolioData(body)
    res.json({ success: true, ok: true })
  } catch (err) {
    res.status(500).json({ success: false, ok: false, error: err.message })
  }
})

export default router
