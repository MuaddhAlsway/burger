import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TreePalm, Mountain, Waves, Cherry, Building2 } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const iconMap = [Building2, TreePalm, Building2, Waves, Mountain, Cherry]

export default function Locations() {
  const { t } = useLang()
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 40 },
        { scrollTrigger: { trigger: headerRef.current, start: 'top 85%' }, opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      )
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 40 },
        { scrollTrigger: { trigger: gridRef.current, start: 'top 90%' }, opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="locations-section section-spacing" id="locations" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-center" ref={headerRef}>
          <div className="overline">{t.locations.overline}</div>
          <h2 className="heading-lg">{t.locations.title1}<br />{t.locations.title2} <em className="copper-text">{t.locations.titleItalic}</em></h2>
          <p className="body-lg">{t.locations.subtitle}</p>
        </div>

        <div className="locations-grid" ref={gridRef}>
          {t.locations.cities.map((loc, i) => {
            const Icon = iconMap[i]
            return (
              <div className="location-card" key={i}>
                <div className="location-card-icon">
                  <Icon size={24} strokeWidth={1.2} color="var(--copper)" />
                </div>
                <h3 className="location-card-city">{loc.city}</h3>
                <p className="location-card-address">{loc.address}</p>
                <div className="location-card-hours">{loc.hours}</div>
                <div className={`location-card-status ${loc.open ? 'open' : 'closed'}`}>
                  <span className="location-card-status-dot"></span>
                  {loc.open ? t.locations.accepting : t.locations.closed}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
