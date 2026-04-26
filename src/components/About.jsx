import { motion } from 'framer-motion'
import { Zap, Target, Shuffle, Users } from 'lucide-react'
import { personalInfo, softSkills } from '../data/portfolio'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const strengthCards = [
  { icon: Zap, title: 'Fast Learner', desc: 'Transitioned from web to Flutter production apps within weeks. Picked up C# purely to solve a native integration problem.' },
  { icon: Target, title: 'Ownership', desc: 'Treat every project as my own. Don\'t wait to be told what to do — I identify gaps, propose solutions, and follow through end-to-end.' },
  { icon: Shuffle, title: 'Creative Problem Solver', desc: 'When the obvious approach fails, I look for unconventional workarounds — from LLM-based image search to self-healing Windows scripts.' },
  { icon: Users, title: 'Team Player', desc: 'Mentored junior developers, communicated across design/backend/QA teams, and delivered under real production deadlines.' },
]

export default function About({ theme }) {
  return (
    <section
      id="about"
      style={{ padding: '7rem 2rem', position: 'relative' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          {/* Label */}
          <motion.div variants={itemVariants} className="section-label" style={{ marginBottom: '1.25rem' }}>
            About Me
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: 'var(--text)',
              margin: 0,
              marginBottom: '3.5rem',
              maxWidth: 700,
            }}
          >
            Building products that{' '}
            <span className="gradient-text">matter</span>,<br />
            one pixel at a time.
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            {/* Left — Bio */}
            <motion.div variants={itemVariants} style={{ gridColumn: 'span 1' }}>
              <div
                className="glass"
                style={{ borderRadius: 16, padding: '2rem', marginBottom: '1.5rem' }}
              >
                {/* Avatar */}
                <div style={{
                  width: 'clamp(120px, 20vw, 160px)', 
                  height: 'clamp(120px, 20vw, 160px)', 
                  borderRadius: '16px',
                  marginBottom: '1.5rem',
                  overflow: 'hidden',
                  border: '2px solid var(--border)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                  flexShrink: 0,
                }}>
                  <img 
                    src={theme === 'dark' ? "/dark.png" : "/light.png"} 
                    alt="Profile" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'opacity 0.3s ease',
                    }} 
                    onError={(e) => {
                      if (!e.target.dataset.retried) {
                        e.target.dataset.retried = 'true';
                        e.target.src = '/profile.jpeg';
                      } else {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--accent), var(--accent-2)); display: flex; align-items: center; justify-content: center; font-family: Syne, sans-serif; font-weight: 800; font-size: 2rem; color: #fff;">MV</div>';
                      }
                    }}
                  />
                </div>

                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
                  {personalInfo.personality}
                </p>
              </div>

              {/* Open to remote */}
              <div
                className="glass"
                style={{
                  borderRadius: 12, padding: '1rem 1.25rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text)' }}>
                    {personalInfo.availability}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                    Open to remote · Preferred: {personalInfo.preferredRoles[0]}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Strength cards */}
            <motion.div
              variants={containerVariants}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}
            >
              {strengthCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  className="glass"
                  style={{ borderRadius: 14, padding: '1.5rem' }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: 'var(--glow)',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1rem',
                    color: 'var(--accent)',
                  }}>
                    <card.icon size={18} />
                  </div>
                  <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem', margin: 0, marginBottom: '0.5rem', color: 'var(--text)' }}>
                    {card.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.7 }}>
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
