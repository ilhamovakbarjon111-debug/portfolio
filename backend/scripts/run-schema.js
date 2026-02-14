/**
 * schema.sql ni PostgreSQL da bajaradi.
 * Ishga tushirish: backend papkada   node scripts/run-schema.js
 */
import 'dotenv/config'
import pg from 'pg'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('Xato: .env da DATABASE_URL yo\'q')
  process.exit(1)
}

const client = new pg.Client({ connectionString: DATABASE_URL })
const schemaPath = join(__dirname, '..', 'schema.sql')
const sql = readFileSync(schemaPath, 'utf8')

try {
  await client.connect()
  await client.query(sql)
  console.log('Barcha jadvallar yaratildi: contact_messages, profile, statistics, skills, projects')
} catch (err) {
  console.error('Xato:', err.message)
  process.exit(1)
} finally {
  await client.end()
}
