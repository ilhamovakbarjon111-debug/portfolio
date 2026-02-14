import crypto from 'crypto'

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000

export function createToken(secret) {
  const payload = { exp: Date.now() + TOKEN_TTL_MS, admin: true }
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = crypto.createHmac('sha256', String(secret)).update(payloadB64).digest('base64url')
  return `${payloadB64}.${sig}`
}

export function verifyToken(token, secret) {
  if (!token || typeof token !== 'string') return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [payloadB64, sig] = parts
  const expected = crypto.createHmac('sha256', String(secret)).update(payloadB64).digest('base64url')
  if (sig !== expected) return false
  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString())
    return payload.exp > Date.now()
  } catch {
    return false
  }
}

export function getAuthToken(req) {
  const h = req.headers?.authorization || req.headers?.Authorization
  if (!h || typeof h !== 'string' || !h.startsWith('Bearer ')) return null
  return h.slice(7).trim()
}
