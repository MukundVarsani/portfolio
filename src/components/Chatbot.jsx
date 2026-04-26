import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User } from 'lucide-react'
import ChatResponseRenderer from './ChatResponseRenderer'

export default function Chatbot({ theme }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', data: { type: 'text', content: 'Hi! I\'m here to answer any questions about my experience, skills, or projects! 👋' }, isNew: false }
  ])
  
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const BotAvatar = ({ size = 20 }) => (
    <div style={{
      width: size === 20 ? '2.5rem' : '2rem',
      height: size === 20 ? '2.5rem' : '2rem',
      borderRadius: '50%', flexShrink: 0, overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'var(--surface-2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <img
        src="/avtar.png"
        alt="Me"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onError={(e) => {
          if (!e.target.dataset.retried) {
            e.target.dataset.retried = 'true';
            e.target.src = '/profile.jpeg';
          } else {
            e.target.style.display = 'none';
          }
        }}
      />
    </div>
  )

  useEffect(() => {
    scrollToBottom()
  }, [messages.length, isLoading])

  // Clear isNew flags after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => {
        const hasNew = prev.some(m => m.isNew)
        if (!hasNew) return prev
        return prev.map(m => m.isNew ? { ...m, isNew: false } : m)
      })
    }, 2000)
    return () => clearTimeout(timer)
  }, [messages.length])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('https://portfolio-rag-two.vercel.app/api/ask', {
      // const response = await fetch('http://localhost:3000/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to answer the question.')
      }

      // Parse the structured JSON response from the RAG agent
      let parsed = null
      try {
        const rawAnswer = data.answer
        // The LLM may wrap in ```json ... ``` or return plain JSON
        const cleaned = rawAnswer.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim()
        parsed = JSON.parse(cleaned)
      } catch {
        // Fallback: treat as plain text
        parsed = { type: 'text', content: data.answer }
      }

      setMessages(prev => [...prev, { role: 'bot', data: parsed, isNew: true }])
    } catch (error) {
      console.error('Chat API Error:', error)
      setMessages(prev => [...prev, { role: 'bot', data: { type: 'text', content: `Sorry, I encountered an error: ${error.message}` }, isNew: true }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="glass"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          cursor: 'pointer',
          border: '1px solid var(--border)',
          background: 'var(--accent)',
          color: '#fff',
          padding: 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 50 : 0, pointerEvents: isOpen ? 'none' : 'auto' }}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="glass"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: 'min(calc(100vw - 2rem), 440px)',
              height: '600px',
              maxHeight: 'calc(100vh - 4rem)',
              borderRadius: '16px',
              zIndex: 10000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.25rem',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'transparent',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <BotAvatar size={20} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontFamily: 'Syne, sans-serif', color: 'var(--text)' }}>Chat with me</h3>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ask me anything</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0.5rem', borderRadius: '50%'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '100%',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    maxWidth: msg.role === 'bot' && msg.data?.type !== 'text' ? '95%' : '85%',
                  }}>
                    {msg.role === 'user' ? (
                      <div style={{
                        width: '2rem', height: '2rem', borderRadius: '50%', flexShrink: 0,
                        background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text-muted)', border: '1px solid var(--border)'
                      }}>
                        <User size={14} />
                      </div>
                    ) : (
                      <BotAvatar size={14} />
                    )}
                    <div style={{
                      padding: '0.875rem 1.125rem',
                      borderRadius: '16px',
                      borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                      borderTopLeftRadius: msg.role === 'bot' ? '4px' : '16px',
                      background: msg.role === 'user' ? 'var(--accent)' : 'var(--surface-2)',
                      color: msg.role === 'user' ? '#fff' : 'var(--text)',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      border: msg.role === 'bot' ? '1px solid var(--border)' : 'none',
                      maxWidth: msg.role === 'bot' && msg.data?.type !== 'text' ? '100%' : undefined,
                      width: msg.role === 'bot' && msg.data?.type !== 'text' ? '100%' : undefined,
                    }}>
                      {msg.role === 'bot' && msg.data
                        ? <ChatResponseRenderer data={msg.data} isNew={msg.isNew} />
                        : msg.text
                      }
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', maxWidth: '85%' }}>
                  <BotAvatar size={14} />
                  <div style={{
                    padding: '0.875rem 1.125rem',
                    borderRadius: '16px', borderTopLeftRadius: '4px',
                    background: 'var(--surface-2)', border: '1px solid var(--border)',
                    display: 'flex', gap: '0.25rem', alignItems: 'center'
                  }}>
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)' }}
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)' }}
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)' }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} style={{
              padding: '1.25rem',
              borderTop: '1px solid var(--border)',
              background: 'transparent',
              display: 'flex',
              gap: '0.75rem'
            }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                style={{
                  flex: 1,
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: '99px',
                  padding: '0.75rem 1.25rem',
                  color: 'var(--text)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                style={{
                  width: '2.75rem', height: '2.75rem', borderRadius: '50%',
                  background: 'var(--accent)', color: '#fff',
                  border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: (isLoading || !input.trim()) ? 'not-allowed' : 'pointer',
                  opacity: (isLoading || !input.trim()) ? 0.6 : 1,
                  transition: 'opacity 0.2s',
                  flexShrink: 0
                }}
              >
                <Send size={18} style={{ transform: 'translateX(-1px) translateY(1px)' }} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
