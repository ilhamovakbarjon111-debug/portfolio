import { neon } from '@neondatabase/serverless'

let client = null

export function getDb() {
  const url = process.env.DATABASE_URL
  if (!url || !String(url).trim()) return null
  if (!client) client = neon(url)
  return client
}
