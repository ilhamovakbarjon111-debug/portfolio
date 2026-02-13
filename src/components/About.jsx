import { motion } from 'framer-motion'
import { Wrench, Lightbulb, Code2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { usePortfolioData } from '../context/PortfolioDataContext'
import { SectionBackground } from './AnimatedBackground'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
}

export default function About() {
  const { t } = useLanguage()
  const { skills: skillsData, defaultSkills } = usePortfolioData()
  const skills = skillsData.map((s) => {
    const name = typeof s === 'string' ? s : s.name
    const defaultSkill = defaultSkills.find((d) => d.name === name)
    return { name, icon: defaultSkill?.icon ?? Code2 }
  })

  return (
    <section id="about" className="py-28 relative">
      <SectionBackground />
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] uppercase tracking-widest">
              <Wrench className="w-4 h-4" strokeWidth={2} />
              — 01
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">{t.about.title}</span>
            </h2>
            <div className="p-6 md:p-8 rounded-2xl bg-[var(--surface-elevated)]/80 border border-[var(--border)] hover:border-[var(--accent)]/30 transition-colors hover-shine backdrop-blur-sm">
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                {t.about.p1}
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed">
                {t.about.p2}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-lg font-semibold text-[var(--text)] mb-6 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[var(--accent)]" />
              {t.about.skills}
            </p>
            <motion.ul
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {skills.map((skill) => {
                const Icon = skill.icon
                return (
                  <motion.li
                    key={skill.name}
                    variants={item}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text)] font-medium hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10 transition-all cursor-default"
                  >
                    <Icon className="w-4 h-4 text-[var(--accent)]" strokeWidth={2} />
                    {skill.name}
                  </motion.li>
                )
              })}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-[var(--accent)]/30 bg-[var(--accent)]/5 text-center text-sm text-[var(--text-muted)]"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" strokeWidth={2} />
              Open to new tools & frameworks
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
