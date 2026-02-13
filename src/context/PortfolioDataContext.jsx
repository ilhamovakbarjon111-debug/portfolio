import { createContext, useContext, useCallback, useMemo, useState } from 'react'
import { translations } from '../translations'
import { projects as defaultProjects } from '../data/projects'
import { skills as defaultSkills } from '../data/skills'

const STORAGE_KEY = 'portfolio-admin-data'

const defaultOverrides = {
  profile: {
    en: {},
    uz: {},
    ru: {},
  },
  stats: { projects: 20, experience: 3, clients: 15, startups: 5 },
  skills: defaultSkills.map((s) => ({ name: s.name })),
  projects: defaultProjects,
}

function loadOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultOverrides
    const parsed = JSON.parse(raw)
    return {
      profile: { ...defaultOverrides.profile, ...parsed.profile },
      stats: { ...defaultOverrides.stats, ...parsed.stats },
      skills: Array.isArray(parsed.skills) ? parsed.skills : defaultOverrides.skills,
      projects: Array.isArray(parsed.projects) ? parsed.projects : defaultOverrides.projects,
    }
  } catch {
    return defaultOverrides
  }
}

function getMergedTranslations(lang, overrides) {
  const t = translations[lang] || translations.en
  const p = overrides.profile?.[lang] || {}
  return {
    ...t,
    hero: {
      ...t.hero,
      name: p.name ?? t.hero.name,
      title: p.title ?? t.hero.title,
      subtitle: p.subtitle ?? t.hero.subtitle,
    },
    about: {
      ...t.about,
      p1: p.aboutP1 ?? t.about.p1,
      p2: p.aboutP2 ?? t.about.p2,
    },
    footer: {
      ...t.footer,
      copyright: p.footerCopyright ?? t.footer.copyright,
    },
  }
}

export const PortfolioDataContext = createContext(null)

export function PortfolioDataProvider({ children }) {
  const [overrides, setOverridesState] = useState(loadOverrides)

  const setOverrides = useCallback((next) => {
    setOverridesState((prev) => {
      const profile = {
        en: { ...prev.profile?.en, ...next.profile?.en },
        uz: { ...prev.profile?.uz, ...next.profile?.uz },
        ru: { ...prev.profile?.ru, ...next.profile?.ru },
      }
      const merged = {
        profile: next.profile ? profile : prev.profile,
        stats: { ...prev.stats, ...(next.stats || {}) },
        skills: next.skills !== undefined ? next.skills : prev.skills,
        projects: next.projects !== undefined ? next.projects : prev.projects,
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
      }
      return merged
    })
  }, [])

  const value = useMemo(
    () => ({
      overrides,
      setOverrides,
      getT: (lang) => getMergedTranslations(lang, overrides),
      projects: overrides.projects,
      skills: overrides.skills,
      stats: {
        ...overrides.stats,
        projects: overrides.stats.useAutoProjects === false
          ? (overrides.stats.projects ?? overrides.projects.length)
          : overrides.projects.length,
      },
      defaultSkills,
    }),
    [overrides, setOverrides]
  )

  return (
    <PortfolioDataContext.Provider value={value}>
      {children}
    </PortfolioDataContext.Provider>
  )
}

export function usePortfolioData() {
  const ctx = useContext(PortfolioDataContext)
  if (!ctx) throw new Error('usePortfolioData must be used within PortfolioDataProvider')
  return ctx
}
