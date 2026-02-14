import { getDb } from '../lib/db.js'

/**
 * Barcha portfolio ma'lumotlarini jadvallardan o‘qib frontend formatida qaytaradi.
 */
export async function getPortfolioData() {
  const sql = getDb()
  if (!sql) return null

  const [profileRows, statRows, skillRows, projectRows] = await Promise.all([
    sql`SELECT lang, name, title, subtitle, about_p1, about_p2, footer_by FROM profile`,
    sql`SELECT projects, experience, clients, startups, use_auto_projects FROM statistics WHERE id = 1`,
    sql`SELECT name FROM skills ORDER BY sort_order, id`,
    sql`SELECT id, title, description, image, tags, live_url, code_url FROM projects ORDER BY sort_order, id`,
  ])

  const profile = { en: {}, uz: {}, ru: {} }
  for (const row of profileRows || []) {
    const lang = row.lang
    if (profile[lang] !== undefined) {
      profile[lang] = {
        name: row.name ?? '',
        title: row.title ?? '',
        subtitle: row.subtitle ?? '',
        aboutP1: row.about_p1 ?? '',
        aboutP2: row.about_p2 ?? '',
        footerBy: row.footer_by ?? '',
      }
    }
  }

  const stat = statRows?.[0]
  const stats = {
    projects: stat?.projects ?? 0,
    experience: stat?.experience ?? 0,
    clients: stat?.clients ?? 0,
    startups: stat?.startups ?? 0,
    useAutoProjects: stat?.use_auto_projects ?? true,
  }

  const skills = (skillRows || []).map((r) => ({ name: r.name || '' }))
  const projects = (projectRows || []).map((r) => ({
    id: r.id,
    title: r.title ?? '',
    description: r.description ?? '',
    image: r.image ?? '',
    tags: Array.isArray(r.tags) ? r.tags : [],
    liveUrl: r.live_url ?? '',
    codeUrl: r.code_url ?? '',
  }))

  return { profile, stats, skills, projects }
}

/**
 * Frontend dan kelgan payload ni jadvallarga yozadi.
 */
export async function setPortfolioData(payload) {
  const sql = getDb()
  if (!sql) throw new Error('Database not configured')

  const profile = payload?.profile && typeof payload.profile === 'object' ? payload.profile : {}
  const stats = payload?.stats && typeof payload.stats === 'object' ? payload.stats : {}
  const skills = Array.isArray(payload?.skills) ? payload.skills : []
  const projects = Array.isArray(payload?.projects) ? payload.projects : []

  for (const lang of ['en', 'uz', 'ru']) {
    const p = profile[lang]
    if (!p || typeof p !== 'object') continue
    await sql`
      INSERT INTO profile (lang, name, title, subtitle, about_p1, about_p2, footer_by, updated_at)
      VALUES (
        ${lang},
        ${p.name ?? ''},
        ${p.title ?? ''},
        ${p.subtitle ?? ''},
        ${p.aboutP1 ?? ''},
        ${p.aboutP2 ?? ''},
        ${p.footerBy ?? ''},
        now()
      )
      ON CONFLICT (lang) DO UPDATE SET
        name = EXCLUDED.name,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        about_p1 = EXCLUDED.about_p1,
        about_p2 = EXCLUDED.about_p2,
        footer_by = EXCLUDED.footer_by,
        updated_at = EXCLUDED.updated_at
    `
  }

  await sql`
    INSERT INTO statistics (id, projects, experience, clients, startups, use_auto_projects, updated_at)
    VALUES (
      1,
      ${Number(stats.projects) || 0},
      ${Number(stats.experience) || 0},
      ${Number(stats.clients) || 0},
      ${Number(stats.startups) || 0},
      ${stats.useAutoProjects !== false},
      now()
    )
    ON CONFLICT (id) DO UPDATE SET
      projects = EXCLUDED.projects,
      experience = EXCLUDED.experience,
      clients = EXCLUDED.clients,
      startups = EXCLUDED.startups,
      use_auto_projects = EXCLUDED.use_auto_projects,
      updated_at = EXCLUDED.updated_at
  `

  await sql`DELETE FROM skills`
  for (let i = 0; i < skills.length; i++) {
    const name = skills[i]?.name != null ? String(skills[i].name) : ''
    await sql`INSERT INTO skills (name, sort_order) VALUES (${name}, ${i})`
  }

  await sql`DELETE FROM projects`
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i] || {}
    const id = Number(p.id) || i + 1
    const tags = Array.isArray(p.tags) ? p.tags : []
    await sql`
      INSERT INTO projects (id, title, description, image, tags, live_url, code_url, sort_order, updated_at)
      VALUES (
        ${id},
        ${String(p.title ?? '')},
        ${String(p.description ?? '')},
        ${String(p.image ?? '')},
        ${JSON.stringify(tags)}::jsonb,
        ${String(p.liveUrl ?? '')},
        ${String(p.codeUrl ?? '')},
        ${i},
        now()
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        image = EXCLUDED.image,
        tags = EXCLUDED.tags,
        live_url = EXCLUDED.live_url,
        code_url = EXCLUDED.code_url,
        sort_order = EXCLUDED.sort_order,
        updated_at = EXCLUDED.updated_at
    `
  }
}
