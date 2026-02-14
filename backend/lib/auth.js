import crypto from 'crypto'

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000 // 24 soat

export function createToken(secret) {
  const payload = { exp: Date.now() + TOKEN_TTL_MS, a: 1 }
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = crypto.createHmac('sha256', secret || '').update(payloadB64).digest('base64url')
  return `${payloadB64}.${sig}`
}

export function verifyToken(token, secret) {
  if (!token || typeof token !== 'string') return false
  const [payloadB64, sig] = token.split('.')
  if (!payloadB64 || !sig) return false
  const expected = crypto.createHmac('sha256', secret || '').update(payloadB64).digest('base64url')
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
  if (!h || !h.startsWith('Bearer ')) return null
  return h.slice(7).trim()
}
