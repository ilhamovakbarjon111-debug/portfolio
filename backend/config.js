/**
 * Backend konfiguratsiya. .env da PORT, ADMIN_PASSWORD, DATABASE_URL, ALLOWED_ORIGINS ni o'rnating.
 */
const config = {
  port: Number(process.env.PORT) || 3001,
  adminPassword: process.env.ADMIN_PASSWORD,
  databaseUrl: process.env.DATABASE_URL,
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
}

function validate() {
  const missing = []
  if (!config.adminPassword || !String(config.adminPassword).trim()) missing.push('ADMIN_PASSWORD')
  if (!config.databaseUrl || !String(config.databaseUrl).trim()) missing.push('DATABASE_URL')
  if (missing.length) {
    console.error('❌ Xato: quyidagi o\'zgaruvchilar .env da o\'rnatilishi shart:', missing.join(', '))
    process.exit(1)
  }
  if (config.adminPassword.length < 6) {
    console.warn('⚠️  Ogohlantirish: ADMIN_PASSWORD juda qisqa (6 belgidan kam). Production uchun kuchli parol qo\'ying.')
  }
}

export { config, validate }
