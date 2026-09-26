import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, ExternalLink, RotateCcw } from 'lucide-react'
import { personalInfo } from '../data/portfolio'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ type: null, message: '', mailtoUrl: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const triggerMailtoFallback = (formData) => {
    const subject = encodeURIComponent(`Portfolio Enquiry from ${formData.name.trim() || 'Visitor'}`)
    const body = encodeURIComponent(
      `Hello Mukund,\n\n${formData.message.trim()}\n\n---\nSender Name: ${formData.name.trim()}\nSender Email: ${formData.email.trim()}`
    )
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`

    // Attempt to open email client directly
    window.location.href = mailtoUrl
    return mailtoUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const serviceId = import.meta.env.EMAILJS_SERVICE_ID || import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.EMAILJS_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const autoReplyTemplateId = import.meta.env.AUTO_REPLY_EMAILJS_TEMPLATE_ID || import.meta.env.VITE_AUTO_REPLY_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.EMAILJS_PUBLIC_KEY || import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    // If EmailJS env credentials are configured, try sending via EmailJS REST API
    if (serviceId && templateId && publicKey) {
      try {
        // 1. Send notification email to Mukund
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              name: form.name,
              from_name: form.name,
              email: form.email,
              from_email: form.email,
              reply_to: form.email,
              message: form.message,
              to_name: personalInfo.fullName,
              to_email: personalInfo.email,
            },
          }),
        })

        if (response.ok) {
          // 2. Send auto-reply thank-you email to the visitor
          if (autoReplyTemplateId) {
            fetch('https://api.emailjs.com/api/v1.0/email/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                service_id: serviceId,
                template_id: autoReplyTemplateId,
                user_id: publicKey,
                template_params: {
                  name: form.name,
                  to_name: form.name,
                  to_email: form.email,
                  user_email: form.email,
                  email: form.email,
                  from_name: personalInfo.fullName,
                  reply_to: personalInfo.email,
                  message: form.message,
                },
              }),
            }).catch(err => console.warn('Auto-reply email failed:', err))
          }

          setLoading(false)
          setStatus({
            type: 'emailjs',
            message: "Thanks for reaching out! Your message was delivered successfully and a confirmation has been sent to your email. I'll get back to you shortly.",
            mailtoUrl: '',
          })
          setForm({ name: '', email: '', message: '' })
          return
        } else {
          const errText = await response.text()
          console.warn('EmailJS returned non-200 status:', errText)
        }
      } catch (err) {
        console.warn('EmailJS network request failed:', err)
      }
    }

    // Fallback: Trigger pre-filled mailto
    const mailtoUrl = triggerMailtoFallback(form)
    setLoading(false)
    setStatus({
      type: 'mailto',
      message: `Your enquiry has been prepared. Your email client should open automatically with your message addressed to ${personalInfo.email}.`,
      mailtoUrl,
    })
  }

  const handleReset = () => {
    setStatus({ type: null, message: '', mailtoUrl: '' })
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1rem, 4vw, 2rem)', position: 'relative', overflow: 'hidden' }}>
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
            {status.type ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  style={{ color: status.type === 'emailjs' ? '#4ade80' : 'var(--accent)', marginBottom: '1rem' }}
                >
                  {status.type === 'emailjs' ? (
                    <CheckCircle size={48} strokeWidth={1.5} style={{ margin: '0 auto' }} />
                  ) : (
                    <Mail size={48} strokeWidth={1.5} style={{ margin: '0 auto' }} />
                  )}
                </motion.div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--text)', margin: 0, marginBottom: '0.75rem', fontSize: '1.25rem' }}>
                  {status.type === 'emailjs' ? 'Message Sent!' : 'Enquiry Prepared'}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0, marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {status.message}
                </p>

                {status.type === 'mailto' && status.mailtoUrl && (
                  <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-faint)', margin: 0 }}>
                      Didn't open automatically?
                    </p>
                    <a
                      href={status.mailtoUrl}
                      className="btn-primary"
                      style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem', gap: '0.5rem' }}
                    >
                      <ExternalLink size={14} /> Open in Email App
                    </a>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-outline"
                  style={{ fontSize: '0.8rem', padding: '0.45rem 1rem', margin: '0 auto', gap: '0.4rem', cursor: 'pointer' }}
                >
                  <RotateCcw size={13} /> Send another message
                </button>
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
