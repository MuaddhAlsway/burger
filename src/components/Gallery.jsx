import { useState, useEffect, useCallback, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Beef, Flame, Wine, Leaf, GlassWater, Utensils, X, ChevronLeft, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  { icon: Beef, title: 'The District', desc: 'Signature Wagyu', tall: true, fullDesc: 'Our signature double wagyu patty, aged comte, black garlic aioli, and house-pickled shallots on a charcoal brioche. A masterpiece of balance.' },
  { icon: Flame, title: 'Raw Craft', desc: 'A5 Wagyu Selection', fullDesc: 'Hand-selected A5 Japanese wagyu, sourced directly from Miyazaki prefecture. Served at peak temperature on our Binchotan grill.' },
  { icon: Utensils, title: 'Open Flame', desc: 'Binchotan Grill', fullDesc: 'Japanese Binchotan white charcoal reaches 1000°C, searing each patty in seconds to lock in flavor and create the perfect crust.' },
  { icon: Wine, title: 'Pairings', desc: 'Wine & Burger Flight', tall: true, fullDesc: 'Our sommelier curates a four-course wine pairing designed to elevate each burger course. From Burgundy to Napa, every glass has purpose.' },
  { icon: Leaf, title: 'Garden', desc: 'Our Herb Wall', fullDesc: 'A living wall of micro-herbs, edible flowers, and seasonal greens harvested moments before plating. Freshness you can taste.' },
  { icon: GlassWater, title: 'Private Room', desc: 'Intimate Dining', fullDesc: 'Our private dining room seats up to 20 guests in an environment of quiet luxury. Bespoke menus, dedicated staff, absolute discretion.' },
]

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const popupContentRef = useRef(null)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  const isOpen = selectedIndex !== null
  const item = isOpen ? galleryItems[selectedIndex] : null

  const goNext = useCallback(() => {
    setSelectedIndex(prev => (prev + 1) % galleryItems.length)
  }, [])

  const goPrev = useCallback(() => {
    setSelectedIndex(prev => (prev - 1 + galleryItems.length) % galleryItems.length)
  }, [])

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
        {
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out'
        }
      )

      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: gridRef.current, start: 'top 90%' },
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out'
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="gallery-section section-spacing" id="gallery" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-center" ref={headerRef}>
          <div className="overline">The Gallery</div>
          <h2 className="heading-lg">A Visual <em className="copper-text">Journal.</em></h2>
          <p className="body-lg">
            Moments captured within our walls. The craft, the atmosphere,
            the details that define the BLACK DISTRICT experience.
          </p>
        </div>

        <div className="gallery-grid" ref={gridRef}>
          {galleryItems.map((gItem, i) => {
            const Icon = gItem.icon
            return (
              <div
                className={`gallery-item ${gItem.tall ? 'gallery-item-tall' : ''}`}
                key={i}
                onClick={() => openItem(i)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && openItem(i)}
              >
                <div className="gallery-item-inner">
                  <Icon size={48} strokeWidth={0.8} color="var(--copper)" />
                </div>
                <div className="gallery-item-overlay">
                  <div className="gallery-item-title">{gItem.title}</div>
                  <div className="gallery-item-desc">{gItem.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Gallery Popup */}
      <div
        className={`gallery-popup-overlay ${isOpen ? 'open' : ''}`}
        onClick={closePopup}
      >
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
                <span className="gallery-popup-counter-total">{String(galleryItems.length).padStart(2, '0')}</span>
              </div>
              <div className="gallery-popup-icon">
                <item.icon size={64} strokeWidth={0.8} color="var(--copper)" />
              </div>
              <div className="gallery-popup-content">
                <div className="overline">{item.desc}</div>
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
