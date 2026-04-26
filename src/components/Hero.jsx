import { motion } from 'framer-motion'
import { ArrowDown, Mail, MapPin, Smartphone } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '0 2rem',
      }}
    >
      {/* Background blobs */}
      <div className="glow-blob" style={{ width: 500, height: 500, background: 'var(--accent)', top: '-10%', left: '-15%' }} />
      <div className="glow-blob" style={{ width: 350, height: 350, background: 'var(--accent-2)', bottom: '5%', right: '-10%', animationDelay: '-3s' }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%', paddingTop: '6rem' }}>
        {/* Location badge */}
        <motion.div {...fadeUp(0.1)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.75rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.3rem 0.8rem', borderRadius: '99px',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            fontSize: '0.75rem', color: 'var(--text-muted)',
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
            Available for full-time roles
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={12} /> {personalInfo.location}
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          {...fadeUp(0.2)}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: 'var(--text)',
            margin: 0,
            marginBottom: '0.5rem',
          }}
        >
          {personalInfo.fullName.split(' ')[0]}
          <br />
          <span className="gradient-text">{personalInfo.fullName.split(' ')[1]}</span>
        </motion.h1>

        {/* Title */}
        <motion.div {...fadeUp(0.3)} style={{ marginBottom: '1.5rem' }}>
          <span style={{
            display: 'inline-block',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            color: 'var(--text-muted)',
            letterSpacing: '0.01em',
          }}>
            {personalInfo.title}
            <span style={{ color: 'var(--accent)', marginLeft: '0.5rem' }}>✦</span>
            <span style={{ marginLeft: '0.5rem' }}>Cross-Platform Mobile Apps</span>
          </span>
        </motion.div>

        {/* Objective */}
        <motion.p
          {...fadeUp(0.4)}
          style={{
            maxWidth: 600,
            fontSize: '1rem',
            lineHeight: 1.75,
            color: 'var(--text-muted)',
            margin: 0,
            marginBottom: '2.5rem',
          }}
        >
          {personalInfo.objective}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div {...fadeUp(0.5)} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          <a href="#contact" className="btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
            <Mail size={16} /> Get In Touch
          </a>
          <a href="#projects" className="btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
            <Smartphone size={16} /> View Projects
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.6)}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem' }}
        >
          {[
            { value: '2+', label: 'Years Experience' },
            { value: '3', label: 'Production Apps Published' },
            { value: '6+', label: 'Projects Shipped' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem', color: 'var(--text)', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem', letterSpacing: '0.04em' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '0.4rem', color: 'var(--text-faint)',
          fontSize: '0.65rem', letterSpacing: '0.12em',
          fontFamily: 'Syne, sans-serif', fontWeight: 700, textTransform: 'uppercase',
          zIndex: 1,
        }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
