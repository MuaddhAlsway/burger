import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar({ onReserve }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#" className="nav-brand">
        <div className="nav-brand-mark">
          <div className="nav-brand-mark-inner"></div>
        </div>
        <span className="nav-brand-text">Black District</span>
      </a>

      <div className="nav-links">
        <a href="#collection">Collection</a>
        <a href="#philosophy">Philosophy</a>
        <a href="#experience">Experience</a>
        <a href="#private">Private Dining</a>
        <a href="#gallery">Gallery</a>
        <a href="#locations">Locations</a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button className="nav-reserve-btn" onClick={onReserve}>Reserve</button>
        <button className="nav-mobile-toggle" aria-label="Menu" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} color="var(--platinum)" /> : <Menu size={20} color="var(--platinum)" />}
        </button>
      </div>
    </nav>
  )
}
