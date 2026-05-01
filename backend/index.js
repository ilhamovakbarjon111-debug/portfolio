import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { config, validate } from './config.js'
import adminRoutes from './routes/admin.js'
import contactRoutes from './routes/contact.js'
import portfolioRoutes from './routes/portfolio.js'

validate()

const app = express()

// CORS — agar ALLOWED_ORIGINS ko'rsatilgan bo'lsa, faqat shu manzillarga ruxsat berish
const corsOptions = config.allowedOrigins.length === 0
  ? { origin: true } // hammasi (development uchun)
  : {
      origin: (origin, cb) => {
        // Bo'sh origin (curl, Postman) — ruxsat
        if (!origin) return cb(null, true)
        if (config.allowedOrigins.includes(origin)) return cb(null, true)
        return cb(new Error(`CORS: ${origin} ruxsat etilmagan`))
      },
    }

app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }))

// Soddagina request logger
app.use((req, _res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  }
  next()
})

// Health check — Railway, Render kabi uptime monitorlar uchun
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, success: true, time: new Date().toISOString() })
})

app.use('/api', adminRoutes)
app.use('/api', contactRoutes)
app.use('/api', portfolioRoutes)

app.use((req, res) => {
  res.status(404).json({ success: false, ok: false, error: 'Not found' })
})

app.use((err, _req, res, _next) => {
  console.error('❌ Server xatosi:', err)
  res.status(500).json({ success: false, ok: false, error: 'Internal server error' })
})

app.listen(config.port, () => {
  console.log(`✅ Backend ishlayapti: http://localhost:${config.port}`)
  if (config.allowedOrigins.length) {
    console.log(`   CORS allowed origins: ${config.allowedOrigins.join(', ')}`)
  } else {
    console.log(`   CORS: barcha originlar (development mode)`)
  }
})
