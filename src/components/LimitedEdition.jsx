import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Beef, CircleDot, Wine, Leaf } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: Beef, text: 'A5 Japanese Wagyu, hand-selected' },
  { icon: CircleDot, text: '24-month aged Comte from Jura' },
  { icon: Leaf, text: 'Micro-herbs from vertical farms' },
  { icon: Wine, text: 'Champagne vinegar reduction' },
]

export default function LimitedEdition() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: { trigger: contentRef.current, start: 'top 85%' },
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out'
        }
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
              <span className="limited-badge-text">Per Night</span>
            </div>
          </div>

          <div className="limited-info">
            <div className="overline">Limited Edition</div>
            <h2 className="heading-lg">The Obsidian</h2>
            <p className="body-lg">
              Available only seven times per evening. A5 wagyu, black truffle,
              edible gold leaf, and a secret sauce that took our chef three
              years to perfect. This is not a meal. This is an event.
            </p>

            <div className="limited-features">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <div className="limited-feature" key={i}>
                    <div className="limited-feature-icon">
                      <Icon size={18} strokeWidth={1.5} color="var(--copper)" />
                    </div>
                    <span className="limited-feature-text">{f.text}</span>
                  </div>
                )
              })}
            </div>

            <div className="limited-cta">
              <button className="btn-copper">Reserve The Obsidian</button>
              <button className="btn-outline">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
