import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [showIndicator, setShowIndicator] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setProgress(height > 0 ? (winScroll / height) * 100 : 0)
      setShowIndicator(winScroll < 100)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* O‘ng tomondagi progress bar — scroll foizi */}
      <motion.div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 w-1.5 h-32 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] overflow-hidden hidden sm:block"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-full bg-gradient-to-t from-[var(--accent)] to-pink-500 origin-bottom"
          animate={{ scaleY: Math.max(0.02, progress / 100) }}
          transition={{ type: 'spring', stiffness: 150, damping: 25 }}
        />
      </motion.div>

      {/* Pastdagi "scroll down" indikatori — faqat boshida ko‘rinadi */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: showIndicator ? 1 : 0, y: showIndicator ? 0 : -10 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-0 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70 group-hover:opacity-100 mb-1">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
        </motion.span>
        <div className="mt-1.5 h-8 w-px bg-gradient-to-b from-[var(--accent)] to-transparent rounded-full opacity-60" />
      </motion.button>
    </>
  )
}
