import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Smartphone, Globe, Star } from 'lucide-react'
import { projects, featureProjects } from '../data/portfolio'

const TYPE_COLORS = {
  professional: { bg: '#4ade8015', border: '#4ade8040', text: '#4ade80', label: 'Professional' },
  personal: { bg: '#7c6af715', border: '#7c6af740', text: '#7c6af7', label: 'Personal' },
  learning: { bg: '#f9731615', border: '#f9731640', text: '#f97316', label: 'Learning' },
}

const FILTER_TABS = ['All', 'Professional', 'Personal', 'Learning']

function ProjectCard({ project, index }) {
  const colors = TYPE_COLORS[project.type]

  return (
    <motion.div
      className="glass"
      style={{ borderRadius: 18, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          padding: '0.3rem 0.7rem',
          borderRadius: 6,
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.07em',
          fontFamily: 'Syne, sans-serif',
          background: colors.bg,
          color: colors.text,
          border: `1px solid ${colors.border}`,
        }}>
          {colors.label}
        </div>
        {project.tag.includes('Published') && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            fontSize: '0.65rem', color: '#4ade80', fontWeight: 600,
            fontFamily: 'Syne, sans-serif',
          }}>
            <Star size={10} fill="#4ade80" /> Live
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)', lineHeight: 1.3, marginBottom: '0.25rem' }}>
          {project.shortName}
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>{project.name}</div>
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0, flexGrow: 1 }}>
        {project.description}
      </p>

      {/* Highlight */}
      <div style={{
        padding: '0.75rem 1rem',
        borderRadius: 10,
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        lineHeight: 1.6,
        borderLeft: `3px solid var(--accent)`,
      }}>
        <span style={{ color: 'var(--accent)', fontWeight: 700, fontFamily: 'Syne, sans-serif', fontSize: '0.65rem', letterSpacing: '0.08em', display: 'block', marginBottom: '0.3rem' }}>
          KEY HIGHLIGHT
        </span>
        {project.highlight}
      </div>

      {/* Tech stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {project.tech.map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      {/* Platform + Links */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {project.platform.map(p => (
            <span key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem', color: 'var(--text-faint)' }}>
              {p === 'Web' ? <Globe size={11} /> : <Smartphone size={11} />} {p}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Github size={16} />
            </a>
          )}
          {project.links.playStore && (
            <a href={project.links.playStore} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.7rem', gap: '0.3rem' }}>
              <ExternalLink size={12} /> Play Store
            </a>
          )}
          {project.links.appStore && (
            <a href={project.links.appStore} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '0.3rem 0.7rem', fontSize: '0.7rem', gap: '0.3rem' }}>
              <ExternalLink size={12} /> App Store
            </a>
          )}
          {project.links.apk && (
            <a href={project.links.apk} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.7rem', gap: '0.3rem' }}>
              <ExternalLink size={12} /> APK
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.type === filter.toLowerCase())

  return (
    <section id="projects" style={{ padding: '7rem 2rem', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Label */}
        <motion.div
          className="section-label"
          style={{ marginBottom: '1.25rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            margin: 0,
            marginBottom: '2.5rem',
            color: 'var(--text)',
          }}
        >
          Things I've built
        </motion.h2>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}
        >
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '99px',
                border: '1px solid',
                borderColor: filter === tab ? 'var(--accent)' : 'var(--border)',
                background: filter === tab ? 'var(--accent)' : 'transparent',
                color: filter === tab ? '#fff' : 'var(--text-muted)',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 600, fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Feature Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label" style={{ marginBottom: '1.25rem' }}>Creative Engineering</div>
          <h3 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            letterSpacing: '-0.025em', margin: 0, marginBottom: '2rem',
            color: 'var(--text)',
          }}>
            Problem-solving highlights
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {featureProjects.map((fp, i) => (
              <motion.div
                key={fp.name}
                className="glass"
                style={{ borderRadius: 16, padding: '1.5rem' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <div style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 700,
                  fontSize: '0.9rem', color: 'var(--text)',
                  marginBottom: '0.75rem',
                }}>
                  {fp.name}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0, marginBottom: '1rem' }}>
                  {fp.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {fp.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
