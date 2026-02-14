import { motion } from 'framer-motion'
import { Instagram, Send } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const socials = [
  { href: 'https://instagram.com/akbarjon_ilhamov', icon: Instagram, label: 'Instagram' },
  { href: 'https://t.me/ilhamov_akbarjon', icon: Send, label: 'Telegram' },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative py-14 border-t border-[var(--border)]"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/5 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[var(--text-muted)] text-sm order-2 sm:order-1">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-3 order-1 sm:order-2 flex-wrap justify-center sm:justify-end">
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider w-full sm:w-auto text-center sm:text-right">{t.footer.follow}</span>
            <div className="flex items-center gap-2">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50 transition-all inline-flex items-center justify-center"
                    aria-label={s.label}
                  >
                    <Icon className="w-5 h-5 shrink-0" strokeWidth={2} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
