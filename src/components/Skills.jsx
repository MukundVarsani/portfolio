import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../data/portfolio'

const CATEGORIES = ['All', ...Array.from(new Set(skills.map(s => s.category)))]

const proficiencyColor = {
  expert: '#7c6af7',
  intermediate: '#4fc3f7',
  beginner: '#f97316',
}
const proficiencyLabel = {
  expert: 'Expert',
  intermediate: 'Intermediate',
  beginner: 'Beginner',
}

export default function Skills() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? skills : skills.filter(s => s.category === active)

  return (
    <section id="skills" style={{ padding: '7rem 2rem', position: 'relative', background: 'var(--bg-2)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Label */}
        <motion.div
          className="section-label"
          style={{ marginBottom: '1.25rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills & Expertise
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
          What I work with
        </motion.h2>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '99px',
                border: '1px solid',
                borderColor: active === cat ? 'var(--accent)' : 'var(--border)',
                background: active === cat ? 'var(--accent)' : 'transparent',
                color: active === cat ? '#fff' : 'var(--text-muted)',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 600,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.02em',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}
          >
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="glass"
                style={{ borderRadius: 14, padding: '1.25rem 1.5rem' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', marginBottom: '0.2rem' }}>
                      {skill.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-faint)', letterSpacing: '0.06em' }}>
                      {skill.years}yr{skill.years > 1 ? 's' : ''} experience
                    </div>
                  </div>
                  <span style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    fontFamily: 'Syne, sans-serif',
                    background: `${proficiencyColor[skill.proficiency]}20`,
                    color: proficiencyColor[skill.proficiency],
                    border: `1px solid ${proficiencyColor[skill.proficiency]}40`,
                  }}>
                    {proficiencyLabel[skill.proficiency]}
                  </span>
                </div>

                {/* Bar */}
                <div style={{ height: 4, borderRadius: 99, background: 'var(--surface-2)', overflow: 'hidden' }}>
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${proficiencyColor[skill.proficiency]}, ${skill.proficiency === 'expert' ? 'var(--accent-2)' : proficiencyColor[skill.proficiency]}aa)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
