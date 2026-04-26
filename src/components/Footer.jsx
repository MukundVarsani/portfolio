import { motion } from 'framer-motion'
import { Mail, Heart } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-2)',
      padding: '2.5rem 2rem',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', flexWrap: 'wrap',
        justifyContent: 'space-between', alignItems: 'center',
        gap: '1rem',
      }}>
        {/* Left */}
        <div>
          <div style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: '1.1rem', color: 'var(--text)', marginBottom: '0.25rem',
          }}>
            MV<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
            © {year} Mukund Varsani. All rights reserved.
          </div>
        </div>

        {/* Center */}
        <div style={{
          fontSize: '0.75rem', color: 'var(--text-faint)',
          display: 'flex', alignItems: 'center', gap: '0.35rem',
        }}>
          Built with <Heart size={12} style={{ color: 'var(--accent)' }} fill="var(--accent)" /> using React + Vite + Framer Motion
        </div>

        {/* Right */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a
            href={`mailto:${personalInfo.email}`}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              color: 'var(--text-muted)', fontSize: '0.8rem',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Mail size={14} /> {personalInfo.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
