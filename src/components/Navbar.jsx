import { useState, useEffect } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

export default function Navbar({ onReserve }) {
  const { t, lang, toggle } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)')
    setIsMobile(mq.matches)
    const handleResize = (e) => {
      setIsMobile(e.matches)
      if (e.matches === false) setMobileOpen(false)
    }
    mq.addEventListener('change', handleResize)
    return () => mq.removeEventListener('change', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className={`nav-brand ${mobileOpen ? 'nav-brand--hidden' : ''}`}>
          <div className="nav-brand-mark">
            <div className="nav-brand-mark-inner"></div>
          </div>
          <span className="nav-brand-text">Black District</span>
        </a>

        <div className="nav-links">
          <a href="#collection">{t.nav.collection}</a>
          <a href="#philosophy">{t.nav.philosophy}</a>
          <a href="#experience">{t.nav.experience}</a>
          <a href="#private">{t.nav.privateDining}</a>
          <a href="#gallery">{t.nav.gallery}</a>
          <a href="#locations">{t.nav.locations}</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button className="lang-toggle" onClick={toggle} aria-label="Toggle language">
            <Globe size={16} strokeWidth={1.5} />
            <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
          </button>
          <button className="nav-reserve-btn" onClick={onReserve}>{t.nav.reserve}</button>
          <button className="nav-mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Menu">
            <Menu size={20} color="var(--platinum)" />
          </button>
        </div>
      </nav>

      {isMobile && (
        <>
          <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
            <div className="mobile-nav-header">
              <a href="#" className="nav-brand" onClick={() => setMobileOpen(false)}>
                <div className="nav-brand-mark">
                  <div className="nav-brand-mark-inner"></div>
                </div>
                <span className="nav-brand-text">Black District</span>
              </a>
              <button className="mobile-nav-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={24} color="var(--platinum)" />
              </button>
            </div>
            <div className="mobile-nav-links">
              <a href="#collection" onClick={() => setMobileOpen(false)}>{t.nav.collection}</a>
              <a href="#philosophy" onClick={() => setMobileOpen(false)}>{t.nav.philosophy}</a>
              <a href="#experience" onClick={() => setMobileOpen(false)}>{t.nav.experience}</a>
              <a href="#private" onClick={() => setMobileOpen(false)}>{t.nav.privateDining}</a>
              <a href="#gallery" onClick={() => setMobileOpen(false)}>{t.nav.gallery}</a>
              <a href="#locations" onClick={() => setMobileOpen(false)}>{t.nav.locations}</a>
            </div>
            <div className="mobile-nav-footer">
              <button className="lang-toggle" onClick={toggle}>
                <Globe size={16} strokeWidth={1.5} />
                <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
              </button>
              <button className="btn-copper" style={{ width: '100%' }} onClick={() => { setMobileOpen(false); onReserve(); }}>{t.nav.reserve}</button>
            </div>
          </div>
          {mobileOpen && <div className="mobile-nav-overlay open" onClick={() => setMobileOpen(false)} />}
        </>
      )}
    </>
  )
}
