import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, Flame, Leaf, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  { icon: Search, name: 'Source', desc: 'Direct relationships with the world\'s finest ranches and farms.' },
  { icon: Flame, name: 'Craft', desc: 'Dry-aging, hand-forming, and flame-grilling with precision timing.' },
  { icon: Leaf, name: 'Season', desc: 'Ingredients served at peak flavor, never off-season.' },
  { icon: Sparkles, name: 'Present', desc: 'Every plate is composed with the care of fine art.' },
]

export default function IngredientPhilosophy() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const quoteRef = useRef(null)

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

      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: { trigger: quoteRef.current, start: 'top 90%' },
          opacity: 1, y: 0, duration: 1, ease: 'power3.out'
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="philosophy-section section-spacing" id="philosophy" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-center" ref={headerRef}>
          <div className="overline">Ingredient Philosophy</div>
          <h2 className="heading-lg">We Don't Follow Trends.<br />We Set <em className="copper-text">Standards.</em></h2>
          <p className="body-lg">
            Every ingredient is sourced with intention. We work directly with
            ranchers, farmers, and artisans who share our obsession with quality.
          </p>
        </div>

        <div className="philosophy-grid" ref={gridRef}>
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <div className="philosophy-card" key={i}>
                <div className="philosophy-card-content">
                  <div className="philosophy-card-icon-wrap">
                    <Icon size={36} strokeWidth={1} color="var(--copper)" />
                  </div>
                  <h3 className="philosophy-card-name">{p.name}</h3>
                  <p className="philosophy-card-desc">{p.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="philosophy-quote" ref={quoteRef}>
          <blockquote>
            "A great burger is not about ingredients alone. It's about the
            conviction to reject everything less than extraordinary."
          </blockquote>
          <cite>— Marcus Bellamy, Executive Chef</cite>
        </div>
      </div>
    </section>
  )
}
