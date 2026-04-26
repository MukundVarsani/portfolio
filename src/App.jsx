import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import Chatbot from './components/Chatbot'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()
  const [loading, setLoading] = useState(true)

  // Track cursor for ambient glow effect
  useEffect(() => {
    const glow = document.querySelector('.cursor-glow')
    if (!glow) return

    const onMove = (e) => {
      glow.style.left = `${e.clientX}px`
      glow.style.top = `${e.clientY}px`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="noise" style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Ambient cursor glow */}
      <div className="cursor-glow" />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {/* Main content */}
      {!loading && (
        <>
          <Navbar theme={theme} toggleTheme={toggle} />
          <main>
            <Hero />
            <About theme={theme} />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
          <Chatbot theme={theme} />
        </>
      )}
    </div>
  )
}
