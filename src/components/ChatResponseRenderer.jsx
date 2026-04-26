import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Briefcase, Code2, BarChart3, List, FileText, Layers, Clock } from 'lucide-react'

/* ── Stagger wrapper (non-text types only) ───────────── */
const StaggerIn = ({ children, isNew }) => (
  <motion.div
    initial={isNew ? { opacity: 0, y: 8 } : false}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
)

/* ── Type Icon Map ───────────────────────────────────── */
const typeIcons = {
  text: <FileText size={13} />,
  list: <List size={13} />,
  keyvalue: <Layers size={13} />,
  cards: <Briefcase size={13} />,
  skills: <Code2 size={13} />,
  timeline: <Clock size={13} />,
  stats: <BarChart3 size={13} />,
}

/* ── Shared Styles ───────────────────────────────────── */
const styles = {
  title: {
    margin: '0 0 0.65rem 0', fontSize: '0.8rem', fontFamily: 'Syne, sans-serif',
    fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.04em',
    display: 'flex', alignItems: 'center', gap: '0.4rem',
  },
  card: {
    background: 'var(--bg-2)', border: '1px solid var(--border)',
    borderRadius: '10px', padding: '0.7rem 0.85rem',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  tag: {
    display: 'inline-block', padding: '0.15rem 0.5rem', borderRadius: '4px',
    fontSize: '0.65rem', fontWeight: 600, background: 'var(--surface-2)',
    color: 'var(--text-muted)', border: '1px solid var(--border)',
  },
  link: {
    color: 'var(--accent)', textDecoration: 'none', fontSize: '0.75rem',
    fontWeight: 600, display: 'inline-flex', alignItems: 'center',
    gap: '0.25rem', transition: 'opacity 0.2s',
  },
}

/* ─────────────────────────────────────────────────────── */
/*  GPT-STYLE TYPEWRITER                                  */
/*  Only renders revealed words → bubble grows with text  */
/* ─────────────────────────────────────────────────────── */
function TypewriterText({ text, speed = 25 }) {
  const [charIndex, setCharIndex] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    let i = 0
    const timer = setInterval(() => {
      i += 1
      if (i >= text.length) {
        setCharIndex(text.length)
        clearInterval(timer)
      } else {
        setCharIndex(i)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return (
    <span>
      {text.slice(0, charIndex)}
      {charIndex < text.length && (
        <span style={{
          display: 'inline-block', width: '2px', height: '1em',
          background: 'var(--accent)', marginLeft: '1px',
          animation: 'cursorBlink 0.8s steps(2) infinite',
          verticalAlign: 'text-bottom',
        }} />
      )}
    </span>
  )
}

/* ── 1. TEXT ──────────────────────────────────────────── */
function TextResponse({ data, isNew }) {
  return (
    <div style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text)' }}>
      {isNew ? <TypewriterText text={data.content} /> : data.content}
    </div>
  )
}

/* ── 2. LIST ─────────────────────────────────────────── */
function ListResponse({ data, isNew }) {
  return (
    <StaggerIn isNew={isNew}>
      {data.title && <h4 style={styles.title}>{typeIcons.list}{data.title}</h4>}
      <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {data.items?.map((item, i) => (
          <motion.li key={i}
            initial={isNew ? { opacity: 0, x: -8 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: isNew ? i * 0.06 : 0 }}
            style={{ fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.5 }}
          >{item}</motion.li>
        ))}
      </ul>
    </StaggerIn>
  )
}

/* ── 3. KEY-VALUE ────────────────────────────────────── */
function KeyValueResponse({ data, isNew }) {
  return (
    <StaggerIn isNew={isNew}>
      {data.title && <h4 style={styles.title}>{typeIcons.keyvalue}{data.title}</h4>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {data.items?.map((item, i) => (
          <motion.div key={i}
            initial={isNew ? { opacity: 0, y: 4 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isNew ? i * 0.06 : 0 }}
            style={{ ...styles.card, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 0.75rem' }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, flexShrink: 0 }}>{item.key}</span>
            {item.link ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ ...styles.link, fontSize: '0.78rem' }}>
                {item.value} <ExternalLink size={11} />
              </a>
            ) : (
              <span style={{ fontSize: '0.78rem', color: 'var(--text)', textAlign: 'right', wordBreak: 'break-word' }}>{item.value}</span>
            )}
          </motion.div>
        ))}
      </div>
    </StaggerIn>
  )
}

/* ── 4. CARDS ────────────────────────────────────────── */
function CardsResponse({ data, isNew }) {
  return (
    <StaggerIn isNew={isNew}>
      {data.title && <h4 style={styles.title}>{typeIcons.cards}{data.title}</h4>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {data.items?.map((item, i) => (
          <motion.div key={i}
            initial={isNew ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isNew ? i * 0.08 : 0 }}
            style={styles.card} className="chat-card-hover"
          >
            <div style={{ marginBottom: '0.3rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{item.title}</div>
              {item.subtitle && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{item.subtitle}</div>}
            </div>
            {item.description && <p style={{ margin: '0.3rem 0 0.45rem', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.description}</p>}
            {item.tags?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: item.links?.length ? '0.45rem' : 0 }}>
                {item.tags.map((tag, j) => <span key={j} style={styles.tag}>{tag}</span>)}
              </div>
            )}
            {item.links?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.3rem' }}>
                {item.links.map((link, j) => link.url && (
                  <a key={j} href={link.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
                    {link.label || 'View'} <ExternalLink size={11} />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </StaggerIn>
  )
}

/* ── 5. SKILLS ───────────────────────────────────────── */
const levelWidths = { expert: '100%', intermediate: '65%', beginner: '35%' }
const levelColors = {
  expert: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
  intermediate: 'linear-gradient(90deg, var(--accent), #a78bfa)',
  beginner: 'linear-gradient(90deg, var(--accent-warm), #fbbf24)',
}

function SkillsResponse({ data, isNew }) {
  return (
    <StaggerIn isNew={isNew}>
      {data.title && <h4 style={styles.title}>{typeIcons.skills}{data.title}</h4>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        {data.items?.map((item, i) => (
          <motion.div key={i}
            initial={isNew ? { opacity: 0, x: -6 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: isNew ? i * 0.05 : 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text)' }}>{item.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {item.years && <span style={{ fontSize: '0.65rem', color: 'var(--text-faint)' }}>{item.years}y</span>}
                <span style={{
                  fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                  color: item.level === 'expert' ? 'var(--accent-2)' : item.level === 'intermediate' ? '#a78bfa' : 'var(--accent-warm)',
                }}>{item.level}</span>
              </div>
            </div>
            <div style={{ height: '3px', borderRadius: '99px', background: 'var(--surface-2)', overflow: 'hidden' }}>
              <motion.div
                initial={isNew ? { width: 0 } : false}
                animate={{ width: levelWidths[item.level] || '50%' }}
                transition={{ duration: 0.6, delay: isNew ? i * 0.06 : 0, ease: 'easeOut' }}
                style={{ height: '100%', borderRadius: '99px', background: levelColors[item.level] || levelColors.intermediate }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </StaggerIn>
  )
}

/* ── 6. TIMELINE ─────────────────────────────────────── */
function TimelineResponse({ data, isNew }) {
  return (
    <StaggerIn isNew={isNew}>
      {data.title && <h4 style={styles.title}>{typeIcons.timeline}{data.title}</h4>}
      <div style={{ position: 'relative', paddingLeft: '1.2rem' }}>
        <div style={{
          position: 'absolute', left: '4px', top: '6px', bottom: '6px', width: '2px',
          background: 'linear-gradient(to bottom, var(--accent), var(--accent-2), transparent)', borderRadius: '99px',
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {data.items?.map((item, i) => (
            <motion.div key={i}
              initial={isNew ? { opacity: 0, x: -8 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isNew ? i * 0.1 : 0 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'absolute', left: '-1.2rem', top: '0.55rem', width: '10px', height: '10px',
                borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--glow-strong)', border: '2px solid var(--bg-2)',
              }} />
              <div style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{item.title}</div>
                    {item.subtitle && <div style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600, marginTop: '0.1rem' }}>{item.subtitle}</div>}
                  </div>
                  {item.date && (
                    <span style={{
                      fontSize: '0.65rem', color: 'var(--text-faint)', fontWeight: 600, whiteSpace: 'nowrap',
                      padding: '0.15rem 0.5rem', background: 'var(--surface-2)', borderRadius: '4px', border: '1px solid var(--border)',
                    }}>{item.date}</span>
                  )}
                </div>
                {item.description && <p style={{ margin: '0.3rem 0 0', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.description}</p>}
                {item.tags?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.4rem' }}>
                    {item.tags.map((tag, j) => <span key={j} style={styles.tag}>{tag}</span>)}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </StaggerIn>
  )
}

/* ── 7. STATS ────────────────────────────────────────── */
function StatsResponse({ data, isNew }) {
  return (
    <StaggerIn isNew={isNew}>
      {data.title && <h4 style={styles.title}>{typeIcons.stats}{data.title}</h4>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
        {data.items?.map((item, i) => (
          <motion.div key={i}
            initial={isNew ? { opacity: 0, scale: 0.9 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: isNew ? i * 0.06 : 0 }}
            style={{ ...styles.card, textAlign: 'center', padding: '0.6rem 0.5rem' }}
          >
            <div style={{
              fontSize: '1.1rem', fontWeight: 800, fontFamily: 'Syne, sans-serif',
              background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{item.value}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.15rem' }}>{item.label}</div>
          </motion.div>
        ))}
      </div>
    </StaggerIn>
  )
}

/* ── MAIN RENDERER ───────────────────────────────────── */
const renderers = { text: TextResponse, list: ListResponse, keyvalue: KeyValueResponse, cards: CardsResponse, skills: SkillsResponse, timeline: TimelineResponse, stats: StatsResponse }

export default function ChatResponseRenderer({ data, isNew = false }) {
  if (!data || !data.type) {
    return <TextResponse data={{ content: typeof data === 'string' ? data : JSON.stringify(data) }} isNew={isNew} />
  }
  const Renderer = renderers[data.type]
  if (!Renderer) {
    return <TextResponse data={{ content: data.content || JSON.stringify(data) }} isNew={isNew} />
  }
  return <Renderer data={data} isNew={isNew} />
}
