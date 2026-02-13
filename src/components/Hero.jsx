import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Code2, MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-[15%] w-24 h-24 border-2 border-[var(--accent)]/30 rounded-2xl"
        />
        <motion.div
          animate={{ rotate: -360, y: [0, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 left-[10%] w-16 h-16 border-2 border-pink-500/30 rotate-45"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-[var(--accent)]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-pink-400"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-[var(--accent)] font-medium mb-3 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20"
        >
          <Sparkles className="w-4 h-4" strokeWidth={2} />
          {t.hero.greeting}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          <span className="gradient-text">{t.hero.name}</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 text-xl md:text-2xl text-[var(--text-muted)] font-medium mb-6"
        >
          <Code2 className="w-6 h-6 text-[var(--accent)]" strokeWidth={2} />
          <span>{t.hero.title}</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-[var(--text-muted)] mb-10 max-w-xl mx-auto leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.button
            onClick={() => scrollTo('projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[var(--accent)] to-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow hover-shine"
          >
            {t.hero.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
          </motion.button>
          <motion.button
            onClick={() => scrollTo('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[var(--accent)] text-[var(--accent)] font-semibold hover:bg-[var(--accent)]/10 transition-colors hover-shine"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={2} />
            {t.hero.cta2}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
