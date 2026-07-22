import { useState, useEffect, useCallback, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Beef, Flame, Wine, Leaf, GlassWater, Utensils, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const icons = [Beef, Flame, Utensils, Wine, Leaf, GlassWater]

export default function Gallery() {
  const { t } = useLang()
  const [selectedIndex, setSelectedIndex] = useState(null)
  const popupContentRef = useRef(null)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  const items = t.gallery.items.map((item, i) => ({ ...item, icon: icons[i] }))

  const isOpen = selectedIndex !== null
  const item = isOpen ? items[selectedIndex] : null

  const goNext = useCallback(() => {
    setSelectedIndex(prev => (prev + 1) % items.length)
  }, [items.length])

  const goPrev = useCallback(() => {
    setSelectedIndex(prev => (prev - 1 + items.length) % items.length)
  }, [items.length])

  const openItem = (i) => setSelectedIndex(i)
  const closePopup = () => setSelectedIndex(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'Escape') closePopup()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, goNext, goPrev])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && popupContentRef.current) {
      gsap.fromTo(popupContentRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      )
    }
  }, [selectedIndex])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 40 },
        { scrollTrigger: { trigger: headerRef.current, start: 'top 85%' }, opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      )
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 40 },
        { scrollTrigger: { trigger: gridRef.current, start: 'top 90%' }, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="gallery-section section-spacing" id="gallery" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-center" ref={headerRef}>
          <div className="overline">{t.gallery.overline}</div>
          <h2 className="heading-lg">{t.gallery.title1} <em className="copper-text">{t.gallery.titleItalic}</em></h2>
          <p className="body-lg">{t.gallery.subtitle}</p>
        </div>

        <div className="gallery-grid" ref={gridRef}>
          {items.map((gItem, i) => {
            const Icon = gItem.icon
            return (
              <div
                className={`gallery-item ${gItem.tall ? 'gallery-item-tall' : ''}`}
                key={i}
                onClick={() => openItem(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${gItem.title}`}
                onKeyDown={e => e.key === 'Enter' && openItem(i)}
              >
                <div className="gallery-item-inner">
                  <Icon size={48} strokeWidth={0.8} color="var(--copper)" />
                </div>
                <div className="gallery-item-overlay">
                  <div className="gallery-item-title">{gItem.title}</div>
                  <div className="gallery-item-desc">{gItem.subtitle}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className={`gallery-popup-overlay ${isOpen ? 'open' : ''}`} onClick={closePopup}>
        <div className="gallery-popup" onClick={e => e.stopPropagation()}>
          <button className="gallery-popup-close" onClick={closePopup}>
            <X size={20} strokeWidth={1.5} />
          </button>
          <button className="gallery-popup-nav gallery-popup-prev" onClick={goPrev}>
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>
          <button className="gallery-popup-nav gallery-popup-next" onClick={goNext}>
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>

          {item && (
            <div className="gallery-popup-inner" ref={popupContentRef} key={selectedIndex}>
              <div className="gallery-popup-counter">
                <span className="gallery-popup-counter-current">{String(selectedIndex + 1).padStart(2, '0')}</span>
                <span className="gallery-popup-counter-sep">/</span>
                <span className="gallery-popup-counter-total">{String(items.length).padStart(2, '0')}</span>
              </div>
              <div className="gallery-popup-icon">
                <item.icon size={64} strokeWidth={0.8} color="var(--copper)" />
              </div>
              <div className="gallery-popup-content">
                <div className="overline">{item.subtitle}</div>
                <h3 className="heading-md">{item.title}</h3>
                <p className="body-lg">{item.fullDesc}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
