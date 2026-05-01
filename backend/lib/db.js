/**
 * Database adapter — Neon serverless va lokal Postgres ikkalasini qo'llab-quvvatlaydi.
 *
 * - Agar URL `.neon.tech` ni o'z ichiga olsa → @neondatabase/serverless (HTTP, edge uchun)
 * - Aks holda → pg.Pool (oddiy Postgres, masalan lokal yoki Railway)
 *
 * Ikkalasida ham bir xil tagged-template syntax: sql`SELECT * FROM x WHERE id = ${id}`
 * Natija: massiv (rows).
 */
import { neon } from '@neondatabase/serverless'
import pg from 'pg'

let client = null

/** Tagged template adapterni pg uchun yaratadi (neon kabi ko'rinishda). */
function createPgAdapter(connectionString) {
  // SSL: Neon yoki cloud bo'lsa default true. Lokal `sslmode=disable` bo'lsa false.
  const wantSsl = !/sslmode=disable/i.test(connectionString)
  const isLocal = /localhost|127\.0\.0\.1/i.test(connectionString)
  const ssl = wantSsl && !isLocal ? { rejectUnauthorized: false } : false

  const pool = new pg.Pool({ connectionString, ssl })

  // Tagged template: sql`...` parametrlarni $1, $2, ... ga o'tkazadi
  return function sql(strings, ...values) {
    let text = strings[0]
    for (let i = 0; i < values.length; i++) {
      text += `$${i + 1}` + strings[i + 1]
    }
    return pool.query(text, values).then((res) => res.rows)
  }
}

export function getDb() {
  const url = process.env.DATABASE_URL
  if (!url || !String(url).trim()) return null
  if (client) return client

  // Neon serverless (HTTP) — agar Neon hostini aniqlasak yoki sslmode=require
  // ammo lokal bo'lmasa
  const isNeon = /\.neon\.tech/i.test(url)
  if (isNeon) {
    client = neon(url)
  } else {
    client = createPgAdapter(url)
  }
  return client
}
