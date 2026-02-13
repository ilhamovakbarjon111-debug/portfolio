import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Phone, MessageCircle, MessageSquare, Send, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { SectionBackground } from './AnimatedBackground'

export default function Contact() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)

  const CONTACT_MESSAGES_KEY = 'portfolio-contact-messages'

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const payload = {
      name: form.name?.value?.trim() || '',
      phone: form.phone?.value?.trim() || '',
      telegram: form.telegram?.value?.trim() || '',
      message: form.message?.value?.trim() || '',
      date: new Date().toISOString(),
    }
    try {
      const stored = JSON.parse(localStorage.getItem(CONTACT_MESSAGES_KEY) || '[]')
      stored.unshift(payload)
      localStorage.setItem(CONTACT_MESSAGES_KEY, JSON.stringify(stored))
    } catch (_) {}
    form.reset()
    setSent(true)
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
              </label>
              <input
                type="text"
                required
                name="name"
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
                required
                name="phone"
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
                required
                name="telegram"
                className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition"
                placeholder={t.contact.placeholderTelegram}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)] mb-2">
                <MessageSquare className="w-4 h-4 text-[var(--accent)]" strokeWidth={2} />
                {t.contact.message}
              </label>
              <textarea
                rows={4}
                required
                name="message"
                className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition resize-none"
                placeholder={t.contact.placeholderMessage}
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent-muted)] transition-colors shadow-lg shadow-indigo-500/25"
            >
              {sent ? (
                <>
                  <CheckCircle2 className="w-5 h-5" strokeWidth={2} />
                  {t.contact.sent}
                </>
              ) : (
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
