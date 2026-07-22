import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, Flame, Leaf, Sparkles } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const icons = [Search, Flame, Leaf, Sparkles]

export default function IngredientPhilosophy() {
  const { t } = useLang()
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const quoteRef = useRef(null)

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
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 30 },
        { scrollTrigger: { trigger: quoteRef.current, start: 'top 90%' }, opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="philosophy-section section-spacing" id="philosophy" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-center" ref={headerRef}>
          <div className="overline">{t.philosophy.overline}</div>
          <h2 className="heading-lg">{t.philosophy.title1}<br />{t.philosophy.title2} <em className="copper-text">{t.philosophy.titleItalic}</em></h2>
          <p className="body-lg">{t.philosophy.subtitle}</p>
        </div>
        <div className="philosophy-grid" ref={gridRef}>
          {t.philosophy.pillars.map((p, i) => {
            const Icon = icons[i]
            return (
              <div className="philosophy-card" key={i}>
                <div className="philosophy-card-content">
                  <div className="philosophy-card-icon-wrap"><Icon size={36} strokeWidth={1} color="var(--copper)" /></div>
                  <h3 className="philosophy-card-name">{p.name}</h3>
                  <p className="philosophy-card-desc">{p.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="philosophy-quote" ref={quoteRef}>
          <blockquote>{t.philosophy.quote}</blockquote>
          <cite>{t.philosophy.quoteAuthor}</cite>
        </div>
      </div>
    </section>
  )
}
