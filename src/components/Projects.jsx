import { motion } from 'framer-motion'
import { ExternalLink, Github, FolderGit2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { usePortfolioData } from '../context/PortfolioDataContext'
import { SectionBackground } from './AnimatedBackground'

export default function Projects() {
  const { t } = useLanguage()
  const { projects } = usePortfolioData()

  return (
    <section id="projects" className="py-28 relative">
      <SectionBackground />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-start gap-3"
        >
          <FolderGit2 className="w-10 h-10 text-[var(--accent)] shrink-0 mt-1" strokeWidth={1.5} />
          <div>
            <span className="inline-block text-sm font-semibold text-[var(--accent)] uppercase tracking-widest mb-2">
              — 02
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="gradient-text">{t.projects.title}</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg max-w-xl">
              {t.projects.subtitle}
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group relative rounded-2xl overflow-hidden bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--accent)]/10 hover-shine"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)] via-pink-500 to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-elevated)] via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm text-white border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[var(--text-muted)] mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (project.liveUrl?.startsWith('http://') || project.liveUrl?.startsWith('https://')) {
                          e.preventDefault()
                          window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                        }
                      }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
                    >
                      {t.projects.viewLive}
                      <ExternalLink className="w-4 h-4" strokeWidth={2} />
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (project.codeUrl?.startsWith('http://') || project.codeUrl?.startsWith('https://')) {
                          e.preventDefault()
                          window.open(project.codeUrl, '_blank', 'noopener,noreferrer')
                        }
                      }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    >
                      {t.projects.viewCode}
                      <Github className="w-4 h-4" strokeWidth={2} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
