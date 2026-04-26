import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'var(--bg)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, gap: '1.5rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800,
          fontSize: '2rem', color: 'var(--text)', letterSpacing: '-0.03em',
        }}
      >
        MV<span style={{ color: 'var(--accent)' }}>.</span>
      </motion.div>
      <div className="loader-ring" />
    </motion.div>
  )
}
