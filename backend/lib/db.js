import { neon } from '@neondatabase/serverless'

let sql = null

export function getDb() {
  const url = process.env.DATABASE_URL
  if (!url) return null
  if (!sql) sql = neon(url)
  return sql
}
