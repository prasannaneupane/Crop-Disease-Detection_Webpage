import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import type { ReactElement } from 'react'

import Navbar from './components/Navbar'

import About from './pages/About'
import Detect from './pages/Detect'
import Features from './pages/Features'
import GetStarted from './pages/GetStarted'
import Home from './pages/Home'

export default function App(): ReactElement {
  // Keeps navigation feeling “app-like” by scrolling to top on route changes.
  const location = useLocation()

  useEffect(() => {
    // "instant" isn't a standard value; keep it deterministic.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="app">
      <Navbar />

      {/* Fixed navbar offset */}
      <main className="app__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/detect" element={<Detect />} />
          <Route path="/about" element={<About />} />
          <Route path="/get-started" element={<GetStarted />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <p className="footer__text">
            © {new Date().getFullYear()} Crop Disease Detection — Khwopa College Of Engineering
          </p>
          <p className="footer__text footer__muted">
            Frontend-only prototype 
          </p>
        </div>
      </footer>
    </div>
  )
}
