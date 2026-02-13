import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Save, User, BarChart3, List, FolderKanban, Mail, X, Lock, LogOut, Phone, MessageCircle, Trash2, Image } from 'lucide-react'
import { usePortfolioData } from '../context/PortfolioDataContext'

const AUTH_KEY = 'portfolio-admin-auth'
const getCorrectPassword = () => {
  const v = import.meta.env?.VITE_ADMIN_PASSWORD
  return typeof v === 'string' && v.trim() ? v.trim() : 'admin'
}

const LANGS = [
  { key: 'en', label: 'EN' },
  { key: 'uz', label: 'UZ' },
  { key: 'ru', label: 'RU' },
]

const CONTACT_MESSAGES_KEY = 'portfolio-contact-messages'

const TABS = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'stats', label: 'Statistika', icon: BarChart3 },
  { id: 'skills', label: "Ko'nikmalar", icon: List },
  { id: 'projects', label: 'Loyihalar', icon: FolderKanban },
  { id: 'messages', label: 'Xabarlar', icon: Mail },
]

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [tab, setTab] = useState('profile')
  const [saved, setSaved] = useState(false)
  const [contactMessages, setContactMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CONTACT_MESSAGES_KEY) || '[]')
    } catch {
      return []
    }
  })
  const { overrides, setOverrides } = usePortfolioData()

  const refreshContactMessages = () => {
    try {
      setContactMessages(JSON.parse(localStorage.getItem(CONTACT_MESSAGES_KEY) || '[]'))
    } catch {
      setContactMessages([])
    }
  }

  const removeContactMessage = (index) => {
    const next = contactMessages.filter((_, i) => i !== index)
    localStorage.setItem(CONTACT_MESSAGES_KEY, JSON.stringify(next))
    setContactMessages(next)
  }

  const handleProjectImageFile = (projectIndex, file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      updateProject(projectIndex, 'image', reader.result)
    }
    reader.readAsDataURL(file)
  }

  const [form, setForm] = useState(() => ({
    profile: { en: {}, uz: {}, ru: {}, ...overrides.profile },
    stats: { useAutoProjects: overrides.stats.useAutoProjects !== false, ...overrides.stats },
    skills: overrides.skills.map((s) => (typeof s === 'string' ? s : s.name)),
    projects: overrides.projects.map((p) => ({ ...p })),
  }))

  useEffect(() => {
    setForm({
      profile: { en: {}, uz: {}, ru: {}, ...overrides.profile },
      stats: { useAutoProjects: overrides.stats.useAutoProjects !== false, ...overrides.stats },
      skills: overrides.skills.map((s) => (typeof s === 'string' ? s : s.name)),
      projects: overrides.projects.map((p) => ({ ...p })),
    })
  }, [])

  useEffect(() => {
    if (tab === 'messages') refreshContactMessages()
  }, [tab])

  const handleLogin = (e) => {
    e.preventDefault()
    setLoginError('')
    const trimmed = password.trim()
    if (trimmed && trimmed === getCorrectPassword()) {
      sessionStorage.setItem(AUTH_KEY, '1')
      setAuthenticated(true)
      setPassword('')
    } else {
      setLoginError('Noto‘g‘ri parol')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    setAuthenticated(false)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Portfolio
          </Link>
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-4 text-[var(--text)]">
              <Lock className="w-5 h-5 text-[var(--accent)]" />
              <h1 className="text-lg font-bold">Admin panel</h1>
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-4">Tahrirlash uchun parolni kiriting.</p>
            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parol"
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                autoFocus
              />
              {loginError && <p className="text-sm text-red-500">{loginError}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-muted)]"
              >
                Kirish
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const updateForm = (section, key, value) => {
    setForm((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }))
  }

  const updateProfileLang = (langKey, key, value) => {
    setForm((prev) => ({
      ...prev,
      profile: { ...prev.profile, [langKey]: { ...prev.profile[langKey], [key]: value } },
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
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
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
    setForm((prev) => ({ ...prev, skills: prev.skills.map((s, i) => (i === index ? value : s)) }))
  }

  const removeSkill = (index) => {
    setForm((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }))
  }

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--surface-elevated)]/95 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Portfolio
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
              title="Chiqish"
            >
              <LogOut className="w-4 h-4" />
              Chiqish
            </button>
          </div>
          <h1 className="text-lg font-bold text-[var(--text)]">Admin panel</h1>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-muted)] disabled:opacity-70"
          >
            <Save className="w-4 h-4" />
            {saved ? 'Saqlandi!' : 'Saqlash'}
          </button>
        </div>
        <div className="max-w-2xl mx-auto px-4 flex border-t border-[var(--border)]">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium ${tab === id ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' : 'text-[var(--text-muted)]'}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {tab === 'profile' && (
          <div className="space-y-6">
            {LANGS.map(({ key, label }) => (
              <div key={key} className="p-4 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)]">
                <div className="text-sm font-semibold text-[var(--accent)] mb-3">{label}</div>
                <input
                  placeholder="Ism"
                  value={form.profile[key]?.name ?? ''}
                  onChange={(e) => updateProfileLang(key, 'name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text)] mb-2"
                />
                <input
                  placeholder="Lavozim"
                  value={form.profile[key]?.title ?? ''}
                  onChange={(e) => updateProfileLang(key, 'title', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text)] mb-2"
                />
                <textarea
                  placeholder="Qisqacha (subtitle)"
                  value={form.profile[key]?.subtitle ?? ''}
                  onChange={(e) => updateProfileLang(key, 'subtitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text)] mb-2 resize-none"
                  rows={2}
                />
                <textarea
                  placeholder="Men haqimda 1"
                  value={form.profile[key]?.aboutP1 ?? ''}
                  onChange={(e) => updateProfileLang(key, 'aboutP1', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text)] mb-2 resize-none"
                  rows={2}
                />
                <textarea
                  placeholder="Men haqimda 2"
                  value={form.profile[key]?.aboutP2 ?? ''}
                  onChange={(e) => updateProfileLang(key, 'aboutP2', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text)] mb-2 resize-none"
                  rows={2}
                />
                <input
                  placeholder="Footer (by ...)"
                  value={form.profile[key]?.footerBy ?? ''}
                  onChange={(e) => updateProfileLang(key, 'footerBy', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text)]"
                />
              </div>
            ))}
          </div>
        )}

        {tab === 'stats' && (
          <div className="space-y-4 p-4 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)]">
            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">projects (Loyihalar)</label>
              <label className="flex items-center gap-2 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.stats.useAutoProjects !== false}
                  onChange={(e) => updateForm('stats', 'useAutoProjects', e.target.checked)}
                  className="rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                />
                <span className="text-sm text-[var(--text)]">Avtomatik (loyihalar soni)</span>
              </label>
              {form.stats.useAutoProjects !== false ? (
                <p className="text-sm text-[var(--text-muted)]">Joriy: <strong className="text-[var(--text)]">{form.projects.length}</strong> ta</p>
              ) : (
                <input
                  type="number"
                  min={0}
                  value={form.stats.projects ?? 0}
                  onChange={(e) => updateForm('stats', 'projects', +e.target.value || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text)]"
                />
              )}
            </div>
            {['experience', 'clients', 'startups'].map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">{key}</label>
                <input
                  type="number"
                  min={0}
                  value={form.stats[key] ?? 0}
                  onChange={(e) => updateForm('stats', key, +e.target.value || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text)]"
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
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text)]"
                />
                <button
                  type="button"
                  onClick={() => removeSkill(i)}
                  className="px-3 text-red-500 hover:bg-red-500/10 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSkill}
              className="w-full py-3 rounded-xl border border-dashed border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] mt-2"
            >
              + Ko'nikma qo'shish
            </button>
          </div>
        )}

        {tab === 'projects' && (
          <div className="space-y-4">
            {form.projects.map((p, i) => (
              <div key={p.id} className="p-4 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[var(--text)]">Loyiha {i + 1}</span>
                  <button type="button" onClick={() => removeProject(i)} className="text-red-500 text-sm hover:underline">
                    O'chirish
                  </button>
                </div>
                <input
                  placeholder="Sarlavha"
                  value={p.title}
                  onChange={(e) => updateProject(i, 'title', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text)]"
                />
                <textarea
                  placeholder="Tavsif"
                  value={p.description}
                  onChange={(e) => updateProject(i, 'description', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text)] resize-none"
                  rows={2}
                />
                <div>
                  <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Rasm (URL yoki fayl)</label>
                  <input
                    placeholder="Rasm linki (https://...)"
                    value={typeof p.image === 'string' && !p.image.startsWith('data:') ? p.image : ''}
                    onChange={(e) => updateProject(i, 'image', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text)] mb-2"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--text-muted)]">yoki</span>
                    <label className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] text-sm text-[var(--text)] cursor-pointer hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                      <Image className="w-4 h-4" />
                      Fayldan tanlash
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                          const f = e.target.files?.[0]
                          if (f) handleProjectImageFile(i, f)
                          e.target.value = ''
                        }}
                      />
                    </label>
                  </div>
                  {p.image && (
                    <div className="mt-2">
                      <img
                        src={p.image}
                        alt=""
                        className="h-20 rounded-lg object-cover border border-[var(--border)]"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    </div>
                  )}
                </div>
                <input
                  placeholder="Teglar (vergul bilan)"
                  value={Array.isArray(p.tags) ? p.tags.join(', ') : ''}
                  onChange={(e) => updateProject(i, 'tags', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text)]"
                />
                <input
                  placeholder="Sayt havolasi"
                  value={p.liveUrl}
                  onChange={(e) => updateProject(i, 'liveUrl', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text)]"
                />
                <input
                  placeholder="GitHub havolasi"
                  value={p.codeUrl}
                  onChange={(e) => updateProject(i, 'codeUrl', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text)]"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addProject}
              className="w-full py-4 rounded-xl border border-dashed border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center justify-center gap-2"
            >
              <FolderKanban className="w-5 h-5" />
              Loyiha qo'shish
            </button>
          </div>
        )}

        {tab === 'messages' && (
          <div className="space-y-4">
            <p className="text-sm text-[var(--text-muted)]">
              Saytdagi bog‘lanish formasidan kelgan xabarlar. Yangilash uchun tabni qayta tanlang.
            </p>
            {contactMessages.length === 0 ? (
              <div className="p-8 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] text-center text-[var(--text-muted)]">
                Hali xabar yo‘q
              </div>
            ) : (
              contactMessages.map((msg, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2"
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-medium text-[var(--text)]">{msg.name || '—'}</span>
                    <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">
                      {msg.date ? new Date(msg.date).toLocaleString() : ''}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeContactMessage(i)}
                      className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm">
                    {msg.phone ? (
                      <a
                        href={`tel:${msg.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-1.5 text-[var(--accent)] hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {msg.phone}
                      </a>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                        <Phone className="w-3.5 h-3.5 text-[var(--accent)]" />
                        —
                      </span>
                    )}
                    {msg.telegram ? (
                      <a
                        href={`https://t.me/${msg.telegram.replace(/^@/, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[var(--accent)] hover:underline"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        @{msg.telegram.replace(/^@/, '')}
                      </a>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                        <MessageCircle className="w-3.5 h-3.5 text-[var(--accent)]" />
                        —
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text)] pt-1 border-t border-[var(--border)] whitespace-pre-wrap">
                    {msg.message || '—'}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  )
}
