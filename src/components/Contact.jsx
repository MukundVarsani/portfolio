import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate async send
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" style={{ padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background blobs */}
      <div className="glow-blob" style={{ width: 400, height: 400, background: 'var(--accent)', bottom: '-10%', right: '-10%', opacity: 0.2 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          className="section-label"
          style={{ marginBottom: '1.25rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Contact
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
            margin: 0, marginBottom: '1rem', color: 'var(--text)',
          }}
        >
          Let's build something<br />
          <span className="gradient-text">together</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: 500, lineHeight: 1.75, marginBottom: '3.5rem' }}
        >
          I'm currently open to full-time roles and interesting freelance projects. Drop me a message and I'll get back to you soon.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {[
              { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
              { icon: Phone, label: 'Mobile', value: personalInfo.mobile, href: `tel:${personalInfo.mobile}` },
              { icon: MapPin, label: 'Location', value: personalInfo.location, href: null },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="glass"
                style={{ borderRadius: 14, padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'var(--glow)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)', flexShrink: 0,
                }}>
                  <item.icon size={17} />
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)', fontWeight: 600, letterSpacing: '0.1em', fontFamily: 'Syne, sans-serif', marginBottom: '0.2rem' }}>
                    {item.label.toUpperCase()}
                  </div>
                  {item.href ? (
                    <a href={item.href} style={{ color: 'var(--text)', fontSize: '0.88rem', textDecoration: 'none', fontWeight: 500 }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ color: 'var(--text)', fontSize: '0.88rem' }}>{item.value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Availability badge */}
            <motion.div
              className="glass"
              style={{
                borderRadius: 14, padding: '1.25rem 1.5rem',
                background: 'linear-gradient(135deg, var(--glow), transparent)',
                border: '1px solid var(--border)',
              }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80' }} />
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)' }}>
                  Available for hire
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.65 }}>
                Looking for Flutter Developer, Mobile App Developer, or Full-Stack Developer roles. Open to remote.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass"
            style={{ borderRadius: 18, padding: '2rem' }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  style={{ color: '#4ade80', marginBottom: '1rem' }}
                >
                  <CheckCircle size={48} strokeWidth={1.5} style={{ margin: '0 auto' }} />
                </motion.div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--text)', margin: 0, marginBottom: '0.5rem' }}>
                  Message sent!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                  I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Jane Doe' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com' },
                ].map(field => (
                  <div key={field.name}>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', marginBottom: '0.5rem' }}>
                      {field.label.toUpperCase()}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      style={{
                        width: '100%', padding: '0.75rem 1rem',
                        borderRadius: 10,
                        border: '1px solid var(--border)',
                        background: 'var(--surface-2)',
                        color: 'var(--text)',
                        fontSize: '0.88rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        fontFamily: 'DM Sans, sans-serif',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', marginBottom: '0.5rem' }}>
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or role..."
                    required
                    rows={5}
                    style={{
                      width: '100%', padding: '0.75rem 1rem',
                      borderRadius: 10,
                      border: '1px solid var(--border)',
                      background: 'var(--surface-2)',
                      color: 'var(--text)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.2s',
                      fontFamily: 'DM Sans, sans-serif',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ justifyContent: 'center', opacity: loading ? 0.75 : 1, pointerEvents: loading ? 'none' : 'auto' }}
                >
                  {loading ? (
                    <>
                      <div className="loader-ring" style={{ width: 16, height: 16, borderWidth: 2 }} />
                      Sending…
                    </>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
