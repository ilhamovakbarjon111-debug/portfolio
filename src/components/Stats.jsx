import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FolderKanban, Briefcase, Users, Rocket } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { usePortfolioData } from '../context/PortfolioDataContext'

const statKeys = [
  { key: 'projects', icon: FolderKanban },
  { key: 'experience', icon: Briefcase },
  { key: 'clients', icon: Users },
  { key: 'startups', icon: Rocket },
]

function AnimatedNumber({ to, duration = 2, start }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const step = (now) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * to))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [to, duration, start])
  return start ? count : 0
}

export default function Stats() {
  const { t } = useLanguage()
  const { stats: statsData } = usePortfolioData()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-16 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {statKeys.map((stat, i) => {
            const Icon = stat.icon
            const value = statsData[stat.key] ?? 0
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[var(--surface-elevated)]/80 border border-[var(--border)] hover:border-[var(--accent)]/30 transition-colors text-center"
              >
                <Icon className="w-8 h-8 mx-auto mb-3 text-[var(--accent)]" strokeWidth={2} />
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  <AnimatedNumber to={value} start={inView} />
                  {stat.key === 'experience' && '+'}
                </div>
                <div className="text-sm text-[var(--text-muted)]">{t.stats[stat.key]}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
