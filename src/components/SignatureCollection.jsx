import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Beef, Flame, Award } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const icons = [Beef, Flame, Award]

export default function SignatureCollection() {
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
        { opacity: 0, y: 50 },
        { scrollTrigger: { trigger: gridRef.current, start: 'top 90%' }, opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="collection-section section-spacing" id="collection" ref={sectionRef}>
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <div className="overline">{t.collection.overline}</div>
          <h2 className="heading-lg">{t.collection.title1}<br />{t.collection.title2}</h2>
          <p className="body-lg">{t.collection.subtitle}</p>
        </div>
        <div className="collection-grid" ref={gridRef}>
          {t.collection.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <div className="collection-card" key={i}>
                <div className="collection-card-number">{String(i + 1).padStart(2, '0')}</div>
                <div className="collection-card-icon-wrap">
                  <Icon size={48} strokeWidth={1} color="var(--copper)" />
                </div>
                <h3 className="collection-card-name">{item.name}</h3>
                <p className="collection-card-desc">{item.desc}</p>
                <div className="collection-card-meta">
                  <span className="collection-card-price">${[32, 38, 42][i]}</span>
                  <span className="collection-card-tag">{item.tag}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
