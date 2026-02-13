import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, BookOpen } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { SectionBackground } from './AnimatedBackground'

const items = [
  { key: 'item1', icon: Briefcase },
  { key: 'item2', icon: GraduationCap },
  { key: 'item3', icon: BookOpen },
]

export default function Experience() {
  const { t } = useLanguage()

  return (
    <section className="py-28 relative">
      <SectionBackground />
      <div className="max-w-4xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="inline-block text-sm font-semibold text-[var(--accent)] uppercase tracking-widest mb-2">
            — Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">{t.experience.title}</span>
          </h2>
          <p className="text-[var(--text-muted)]">{t.experience.subtitle}</p>
        </motion.div>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--accent)]/50 to-transparent" />
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-14 pb-12 last:pb-0"
              >
                <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-[var(--accent)] border-4 border-[var(--surface)]" />
                <div className="p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--accent)]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-5 h-5 text-[var(--accent)]" strokeWidth={2} />
                    <span className="font-bold text-[var(--text)]">{t.experience[`${item.key}Title`]}</span>
                  </div>
                  <div className="text-sm text-[var(--accent)] mb-2">{t.experience[`${item.key}Place`]}</div>
                  <p className="text-sm text-[var(--text-muted)]">{t.experience[`${item.key}Desc`]}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
