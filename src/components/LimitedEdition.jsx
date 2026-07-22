import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Beef, CircleDot, Wine, Leaf } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const icons = [Beef, CircleDot, Leaf, Wine]

export default function LimitedEdition({ onReserve }) {
  const { t } = useLang()
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 50 },
        { scrollTrigger: { trigger: contentRef.current, start: 'top 85%' }, opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="limited-section section-spacing" ref={sectionRef}>
      <div className="container">
        <div className="limited-content" ref={contentRef}>
          <div className="limited-visual">
            <div className="limited-burger-icon-wrap">
              <Beef size={100} strokeWidth={0.8} color="var(--copper)" />
            </div>
            <div className="limited-badge">
              <span className="limited-badge-number">7</span>
              <span className="limited-badge-text">{t.limited.badgePerNight}</span>
            </div>
          </div>
          <div className="limited-info">
            <div className="overline">{t.limited.overline}</div>
            <h2 className="heading-lg">{t.limited.title}</h2>
            <p className="body-lg">{t.limited.subtitle}</p>
            <div className="limited-features">
              {t.limited.features.map((f, i) => {
                const Icon = icons[i]
                return (
                  <div className="limited-feature" key={i}>
                    <div className="limited-feature-icon"><Icon size={18} strokeWidth={1.5} color="var(--copper)" /></div>
                    <span className="limited-feature-text">{f}</span>
                  </div>
                )
              })}
            </div>
            <div className="limited-cta">
              <button className="btn-copper" onClick={onReserve}>{t.limited.reserveCta}</button>
              <button className="btn-outline" onClick={() => document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' })}>{t.limited.learnCta}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
