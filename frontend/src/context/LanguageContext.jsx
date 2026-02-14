import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../translations'
import { PortfolioDataContext } from './PortfolioDataContext'

const LanguageContext = createContext()

const LANG_KEY = 'portfolio-lang'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(LANG_KEY) || 'en'
    }
    return 'en'
  })
  const portfolioData = useContext(PortfolioDataContext)

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang)
  }, [lang])

  const t = portfolioData ? portfolioData.getT(lang) : (translations[lang] || translations.en)

  const setLanguage = (l) => {
    if (translations[l]) setLang(l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
