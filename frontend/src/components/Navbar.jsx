import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  User,
  FolderKanban,
  Mail,
  Sun,
  Moon,
  Menu,
  X,
  Globe,
  Sparkles,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

const navLinks = [
  { id: 'home', key: 'home', icon: Home },
  { id: 'about', key: 'about', icon: User },
  { id: 'projects', key: 'projects', icon: FolderKanban },
  { id: 'contact', key: 'contact', icon: Mail },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { dark, toggle } = useTheme()
  const { t, lang, setLanguage } = useLanguage()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--border)]"
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollTo('home')}
          className="p-1 rounded-lg text-[var(--text)] hover:text-[var(--accent)] transition-colors"
          aria-label="Home"
        >
          <Sparkles className="w-6 h-6 text-[var(--accent)]" strokeWidth={2} />
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ id, key, icon: Icon }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className="nav-underline flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5 transition-colors font-medium"
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
                {t.nav[key]}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="flex rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface-elevated)]/50 p-0.5">
            {['en', 'uz', 'ru'].map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  lang === l
                    ? 'bg-[var(--accent)] text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={toggle}
            className="p-2.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all"
            aria-label="Toggle theme"
          >
            {dark ? (
              <Sun className="w-5 h-5 text-amber-400" strokeWidth={2} />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" strokeWidth={2} />
            )}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]"
            aria-label="Menu"
          >
            {open ? (
              <X className="w-5 h-5" strokeWidth={2} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[var(--border)] bg-[var(--surface-elevated)]/95 backdrop-blur-xl"
          >
            <ul className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(({ id, key, icon: Icon }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors font-medium"
                  >
                    <Icon className="w-5 h-5" />
                    {t.nav[key]}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
