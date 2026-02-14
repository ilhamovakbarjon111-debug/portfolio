import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { config, validate } from './config.js'
import adminRoutes from './routes/admin.js'
import contactRoutes from './routes/contact.js'
import portfolioRoutes from './routes/portfolio.js'

validate()

const app = express()

app.use(cors({ origin: true }))
app.use(express.json({ limit: '50mb' }))

app.use('/api', adminRoutes)
app.use('/api', contactRoutes)
app.use('/api', portfolioRoutes)

app.use((req, res) => {
  res.status(404).json({ success: false, ok: false, error: 'Not found' })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ success: false, ok: false, error: 'Internal server error' })
})

app.listen(config.port, () => {
  console.log(`Server http://localhost:${config.port}`)
})
