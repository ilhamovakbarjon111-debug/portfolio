import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, X, Save, User, BarChart3, List, FolderKanban } from 'lucide-react'
import { usePortfolioData } from '../context/PortfolioDataContext'

const LANGS = [
  { key: 'en', label: 'EN' },
  { key: 'uz', label: 'UZ' },
  { key: 'ru', label: 'RU' },
]

export default function AdminPanel() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('profile')
  const { overrides, setOverrides } = usePortfolioData()

  const [form, setForm] = useState(() => ({
    profile: { en: {}, uz: {}, ru: {}, ...overrides.profile },
    stats: { ...overrides.stats },
    skills: overrides.skills.map((s) => (typeof s === 'string' ? s : s.name)),
    projects: overrides.projects.map((p) => ({ ...p })),
  }))

  useEffect(() => {
    if (open) {
      setForm({
        profile: { en: {}, uz: {}, ru: {}, ...overrides.profile },
        stats: { ...overrides.stats },
        skills: overrides.skills.map((s) => (typeof s === 'string' ? s : s.name)),
        projects: overrides.projects.map((p) => ({ ...p })),
      })
    }
  }, [open])

  const updateForm = (section, key, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }))
  }

  const updateProfileLang = (langKey, key, value) => {
    setForm((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [langKey]: { ...prev.profile[langKey], [key]: value },
      },
    }))
  }

  const handleSave = () => {
    const profile = {}
    LANGS.forEach(({ key }) => {
      const p = form.profile[key] || {}
      if (Object.keys(p).length) profile[key] = p
    })
    setOverrides({
      profile: { ...overrides.profile, ...profile },
      stats: form.stats,
      skills: form.skills.map((name) => ({ name })),
      projects: form.projects,
    })
    setOpen(false)
  }

  const addProject = () => {
    setForm((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now(),
          title: 'New Project',
          description: '',
          image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
          tags: [],
          liveUrl: '',
          codeUrl: '',
        },
      ],
    }))
  }

  const updateProject = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      projects: prev.projects.map((p, i) =>
        i === index ? { ...p, [field]: field === 'tags' ? (typeof value === 'string' ? value.split(',').map((t) => t.trim()) : value) : value } : p
      ),
    }))
  }

  const removeProject = (index) => {
    setForm((prev) => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }))
  }

  const addSkill = () => {
    setForm((prev) => ({ ...prev, skills: [...prev.skills, ''] }))
  }

  const updateSkill = (index, value) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.map((s, i) => (i === index ? value : s)),
    }))
  }

  const removeSkill = (index) => {
    setForm((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }))
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 p-3 rounded-xl bg-[var(--accent)] text-white shadow-lg hover:bg-[var(--accent-muted)] transition-colors"
        title="Admin panel"
      >
        <Settings className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[var(--surface-elevated)] border-l border-[var(--border)] z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
                <h2 className="text-lg font-bold text-[var(--text)]">Admin panel</h2>
                <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-[var(--surface)]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex border-b border-[var(--border)]">
                {[
                  { id: 'profile', label: 'Profil', icon: User },
                  { id: 'stats', label: 'Statistika', icon: BarChart3 },
                  { id: 'skills', label: 'Ko\'nikmalar', icon: List },
                  { id: 'projects', label: 'Loyihalar', icon: FolderKanban },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`flex-1 flex items-center justify-center gap-1 py-3 text-sm font-medium ${tab === id ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' : 'text-[var(--text-muted)]'}`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {tab === 'profile' && (
                  <div className="space-y-4">
                    {LANGS.map(({ key, label }) => (
                      <div key={key} className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                        <div className="text-xs font-semibold text-[var(--accent)] mb-2">{label}</div>
                        <input
                          placeholder="Ism"
                          value={form.profile[key]?.name ?? ''}
                          onChange={(e) => updateProfileLang(key, 'name', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-[var(--text)] text-sm mb-2"
                        />
                        <input
                          placeholder="Lavozim"
                          value={form.profile[key]?.title ?? ''}
                          onChange={(e) => updateProfileLang(key, 'title', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-[var(--text)] text-sm mb-2"
                        />
                        <textarea
                          placeholder="Qisqacha (subtitle)"
                          value={form.profile[key]?.subtitle ?? ''}
                          onChange={(e) => updateProfileLang(key, 'subtitle', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-[var(--text)] text-sm mb-2 resize-none"
                          rows={2}
                        />
                        <textarea
                          placeholder="Men haqimda 1"
                          value={form.profile[key]?.aboutP1 ?? ''}
                          onChange={(e) => updateProfileLang(key, 'aboutP1', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-[var(--text)] text-sm mb-2 resize-none"
                          rows={2}
                        />
                        <textarea
                          placeholder="Men haqimda 2"
                          value={form.profile[key]?.aboutP2 ?? ''}
                          onChange={(e) => updateProfileLang(key, 'aboutP2', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-[var(--text)] text-sm resize-none"
                          rows={2}
                        />
                        <input
                          placeholder="Footer (by ...)"
                          value={form.profile[key]?.footerBy ?? ''}
                          onChange={(e) => updateProfileLang(key, 'footerBy', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-[var(--text)] text-sm mt-2"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {tab === 'stats' && (
                  <div className="space-y-3">
                    {['projects', 'experience', 'clients', 'startups'].map((key) => (
                      <div key={key}>
                        <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">{key}</label>
                        <input
                          type="number"
                          value={form.stats[key]}
                          onChange={(e) => updateForm('stats', key, +e.target.value || 0)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-[var(--text)]"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {tab === 'skills' && (
                  <div className="space-y-2">
                    {form.skills.map((s, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={s}
                          onChange={(e) => updateSkill(i, e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-[var(--text)] text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removeSkill(i)}
                          className="px-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addSkill}
                      className="w-full py-2 rounded-lg border border-dashed border-[var(--border)] text-[var(--text-muted)] text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      + Ko'nikma qo'shish
                    </button>
                  </div>
                )}

                {tab === 'projects' && (
                  <div className="space-y-4">
                    {form.projects.map((p, i) => (
                      <div key={p.id} className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-[var(--text)]">Loyiha {i + 1}</span>
                          <button type="button" onClick={() => removeProject(i)} className="text-red-500 text-sm">
                            O'chirish
                          </button>
                        </div>
                        <input
                          placeholder="Sarlavha"
                          value={p.title}
                          onChange={(e) => updateProject(i, 'title', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-[var(--text)] text-sm"
                        />
                        <textarea
                          placeholder="Tavsif"
                          value={p.description}
                          onChange={(e) => updateProject(i, 'description', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-[var(--text)] text-sm resize-none"
                          rows={2}
                        />
                        <input
                          placeholder="Rasm URL"
                          value={p.image}
                          onChange={(e) => updateProject(i, 'image', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-[var(--text)] text-sm"
                        />
                        <input
                          placeholder="Teglar (vergul bilan)"
                          value={Array.isArray(p.tags) ? p.tags.join(', ') : ''}
                          onChange={(e) => updateProject(i, 'tags', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-[var(--text)] text-sm"
                        />
                        <input
                          placeholder="Sayt havolasi"
                          value={p.liveUrl}
                          onChange={(e) => updateProject(i, 'liveUrl', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-[var(--text)] text-sm"
                        />
                        <input
                          placeholder="GitHub havolasi"
                          value={p.codeUrl}
                          onChange={(e) => updateProject(i, 'codeUrl', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-[var(--text)] text-sm"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addProject}
                      className="w-full py-3 rounded-xl border border-dashed border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center justify-center gap-2"
                    >
                      <FolderKanban className="w-4 h-4" />
                      Loyiha qo'shish
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-[var(--border)]">
                <button
                  onClick={handleSave}
                  className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[var(--accent-muted)]"
                >
                  <Save className="w-5 h-5" />
                  Saqlash
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
