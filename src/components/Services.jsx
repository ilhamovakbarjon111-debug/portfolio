import { motion } from 'framer-motion'
import { Code2, Palette, Smartphone, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { SectionBackground } from './AnimatedBackground'

const services = [
  { key: 'web', icon: Code2 },
  { key: 'ui', icon: Palette },
  { key: 'mobile', icon: Smartphone },
  { key: 'code', icon: Sparkles },
]

export default function Services() {
  const { t } = useLanguage()

  return (
    <section className="py-28 relative">
      <SectionBackground />
      <div className="max-w-5xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="inline-block text-sm font-semibold text-[var(--accent)] uppercase tracking-widest mb-2">
            — Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">{t.services.title}</span>
          </h2>
          <p className="text-[var(--text-muted)]">{t.services.subtitle}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--accent)]/40 hover:shadow-lg hover:shadow-[var(--accent)]/5 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[var(--accent)]" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-[var(--text)] mb-2">{t.services[s.key]}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {t.services[`${s.key}Desc`]}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
