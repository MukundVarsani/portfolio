import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react'
import { experience, education } from '../data/portfolio'

function TimelineItem({ item, index, isExperience }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative', paddingLeft: '2.25rem', paddingBottom: index < (isExperience ? experience.length - 1 : education.length - 1) ? '2.5rem' : 0 }}
    >
      {/* Line */}
      {index < (isExperience ? experience.length - 1 : education.length - 1) && (
        <div style={{
          position: 'absolute', left: 5, top: 22,
          bottom: 0, width: 1,
          background: 'linear-gradient(to bottom, var(--accent), transparent)',
        }} />
      )}

      {/* Dot */}
      <div style={{
        position: 'absolute', left: 0, top: 6,
        width: 11, height: 11, borderRadius: '50%',
        background: 'var(--accent)',
        boxShadow: '0 0 14px var(--accent)',
        border: '2px solid var(--bg)',
      }} />

      <div className="glass" style={{ borderRadius: 16, padding: '1.5rem 1.75rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)', marginBottom: '0.2rem' }}>
              {isExperience ? item.role : item.degree}
            </div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: 'var(--accent)' }}>
              {isExperience ? item.company : item.institution}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <Calendar size={11} /> {item.duration}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--text-faint)' }}>
              <MapPin size={11} /> {item.location}
            </div>
            {isExperience && (
              <span style={{
                padding: '0.15rem 0.55rem', borderRadius: 4,
                fontSize: '0.62rem', fontWeight: 700,
                fontFamily: 'Syne, sans-serif', letterSpacing: '0.07em',
                background: item.type === 'Full-Time' ? '#4ade8020' : '#7c6af720',
                color: item.type === 'Full-Time' ? '#4ade80' : '#7c6af7',
                border: `1px solid ${item.type === 'Full-Time' ? '#4ade8050' : '#7c6af750'}`,
              }}>
                {item.type}
              </span>
            )}
            {!isExperience && item.score && (
              <span style={{
                padding: '0.15rem 0.55rem', borderRadius: 4,
                fontSize: '0.7rem', fontWeight: 700,
                fontFamily: 'Syne, sans-serif',
                background: 'var(--glow)',
                color: 'var(--accent)',
                border: '1px solid var(--border)',
              }}>
                {item.score}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {isExperience && (
          <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.75, margin: 0, marginBottom: '1rem' }}>
            {item.summary}
          </p>
        )}

        {/* Responsibilities */}
        {isExperience && item.responsibilities && (
          <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {item.responsibilities.map((r, i) => (
              <li key={i} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{r}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section
      id="experience"
      style={{ padding: '7rem 2rem', background: 'var(--bg-2)', position: 'relative' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          className="section-label"
          style={{ marginBottom: '1.25rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Experience & Education
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            lineHeight: 1.1, letterSpacing: '-0.025em',
            margin: 0, marginBottom: '4rem', color: 'var(--text)',
          }}
        >
          My journey so far
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '4rem' }}>
          {/* Experience */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '2rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'var(--glow)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)',
              }}>
                <Briefcase size={17} />
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>
                Work Experience
              </span>
            </div>
            {experience.map((item, i) => (
              <TimelineItem key={item.role + item.company} item={item} index={i} isExperience />
            ))}
          </div>

          {/* Education */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '2rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'var(--glow)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)',
              }}>
                <GraduationCap size={17} />
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>
                Education
              </span>
            </div>
            {education.map((item, i) => (
              <TimelineItem key={item.institution} item={item} index={i} isExperience={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
