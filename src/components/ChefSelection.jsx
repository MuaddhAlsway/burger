import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Trophy, BookOpen, ChefHat } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const credIcons = [Star, Trophy, BookOpen]

export default function ChefSelection() {
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
    <section className="chef-section section-spacing" id="chef" ref={sectionRef}>
      <div className="container">
        <div className="chef-content" ref={contentRef}>
          <div className="chef-visual">
            <div className="chef-portrait">
              <ChefHat size={80} strokeWidth={0.8} color="var(--copper)" style={{ position: 'relative', zIndex: 2 }} />
              <div className="chef-portrait-accent">
                <span className="chef-portrait-accent-number">18</span>
                <span className="chef-portrait-accent-text">{t.chef.years}</span>
              </div>
            </div>
          </div>
          <div className="chef-info">
            <div className="overline">{t.chef.overline}</div>
            <h2 className="heading-lg">{t.chef.name}</h2>
            <p className="body-lg">{t.chef.bio1}</p>
            <p className="body-md" style={{ color: 'var(--silver)' }}>{t.chef.bio2}</p>
            <div className="chef-credentials">
              {t.chef.credentials.map((c, i) => {
                const Icon = credIcons[i]
                return (
                  <div className="chef-credential" key={i}>
                    <div className="chef-credential-icon"><Icon size={20} strokeWidth={1.5} color="var(--copper)" /></div>
                    <div className="chef-credential-title">{c.title}</div>
                    <div className="chef-credential-detail">{c.detail}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
