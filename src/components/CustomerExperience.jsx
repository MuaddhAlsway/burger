import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function CustomerExperience() {
  const { t } = useLang()
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const trackRef = useRef(null)

  const reviews = [...t.experience.reviews, ...t.experience.reviews]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 40 },
        { scrollTrigger: { trigger: headerRef.current, start: 'top 85%' }, opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!trackRef.current) return
    const halfWidth = trackRef.current.scrollWidth / 2
    const anim = gsap.to(trackRef.current, { x: -halfWidth, duration: 40, ease: 'none', repeat: -1 })
    return () => anim.kill()
  }, [t])

  return (
    <section className="experience-section section-spacing" id="experience" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-center" ref={headerRef}>
          <div className="overline">{t.experience.overline}</div>
          <h2 className="heading-lg">{t.experience.title1}<br />{t.experience.title2} <em className="copper-text">{t.experience.titleItalic}</em></h2>
          <p className="body-lg">{t.experience.subtitle}</p>
        </div>
      </div>
      <div className="experience-ticker">
        <div className="experience-track" ref={trackRef}>
          {reviews.map((r, i) => (
            <div className="experience-card" key={i}>
              <div className="experience-card-stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} fill="var(--copper)" color="var(--copper)" />
                ))}
              </div>
              <p className="experience-card-text">"{r.text}"</p>
              <div className="experience-card-author">
                <div className="experience-card-avatar">{r.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <div className="experience-card-author-name">{r.name}</div>
                  <div className="experience-card-author-detail">{r.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
