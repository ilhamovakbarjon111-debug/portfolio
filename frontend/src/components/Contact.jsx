import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Phone, MessageCircle, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { SectionBackground } from './AnimatedBackground'
import { API_BASE } from '../lib/api.js'

const CONTACT_MESSAGES_KEY = 'portfolio-contact-messages'

export default function Contact() {
  const { t } = useLanguage()
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorText, setErrorText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setErrorText('')

    const form = e.target
    const payload = {
      name: form.name?.value?.trim() || '',
      phone: form.phone?.value?.trim() || '',
      telegram: form.telegram?.value?.trim() || '',
      message: form.message?.value?.trim() || '',
    }

    if (!payload.name || !payload.message) {
      setStatus('error')
      setErrorText('Ism va xabar majburiy')
      return
    }

    let backendOk = false
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && (data.ok || data.success)) {
        backendOk = true
      } else if (res.status === 429) {
        setStatus('error')
        setErrorText(data.error || 'Juda ko\'p urinish, biroz kuting')
        return
      } else if (res.status === 400) {
        setStatus('error')
        setErrorText(data.error || 'Ma\'lumotlar to\'g\'ri kiritilmadi')
        return
      }
    } catch (_) {
      // tarmoq xatosi — pastda lokalga saqlaymiz
    }

    // Backend ishlamasa lokal'ga saqlash (offline fallback)
    if (!backendOk) {
      try {
        const stored = JSON.parse(localStorage.getItem(CONTACT_MESSAGES_KEY) || '[]')
        stored.unshift({ ...payload, date: new Date().toISOString() })
        localStorage.setItem(CONTACT_MESSAGES_KEY, JSON.stringify(stored.slice(0, 100)))
      } catch (_) {}
    }

    form.reset()
    setStatus('success')
    setTimeout(() => setStatus('idle'), 3500)
  }

  return (
    <section id="contact" className="py-28 relative">
      <SectionBackground />
      <div className="max-w-2xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-[var(--accent)] uppercase tracking-widest mb-2">
            — 03
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">{t.contact.title}</span>
          </h2>
          <p className="text-[var(--text-muted)]">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="relative p-8 md:p-10 rounded-2xl card-gradient-border overflow-hidden"
        >
          <div className="relative z-10 space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)] mb-2">
                <User className="w-4 h-4 text-[var(--accent)]" strokeWidth={2} />
                {t.contact.name}
                <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                required
                name="name"
                maxLength={100}
                className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition"
                placeholder={t.contact.placeholderName}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)] mb-2">
                <Phone className="w-4 h-4 text-[var(--accent)]" strokeWidth={2} />
                {t.contact.phone}
              </label>
              <input
                type="tel"
                name="phone"
                maxLength={50}
                className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition"
                placeholder={t.contact.placeholderPhone}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)] mb-2">
                <MessageCircle className="w-4 h-4 text-[var(--accent)]" strokeWidth={2} />
                {t.contact.telegram}
              </label>
              <input
                type="text"
                name="telegram"
                maxLength={100}
                className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition"
                placeholder={t.contact.placeholderTelegram}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)] mb-2">
                <MessageSquare className="w-4 h-4 text-[var(--accent)]" strokeWidth={2} />
                {t.contact.message}
                <span className="text-pink-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                name="message"
                maxLength={5000}
                className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition resize-none"
                placeholder={t.contact.placeholderMessage}
              />
            </div>

            <AnimatePresence mode="wait">
              {status === 'error' && errorText && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorText}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={status === 'idle' ? { scale: 1.02 } : {}}
              whileTap={status === 'idle' ? { scale: 0.98 } : {}}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent-muted)] transition-colors shadow-lg shadow-indigo-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' && (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2} />
                  ...
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle2 className="w-5 h-5" strokeWidth={2} />
                  {t.contact.sent}
                </>
              )}
              {(status === 'idle' || status === 'error') && (
                <>
                  <Send className="w-5 h-5" strokeWidth={2} />
                  {t.contact.send}
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
