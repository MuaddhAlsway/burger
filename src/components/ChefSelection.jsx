import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Trophy, BookOpen, ChefHat } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const credentials = [
  { icon: Star, title: 'Michelin Starred', detail: 'Two stars, 2023-present' },
  { icon: Trophy, title: 'World\'s Best Burger', detail: 'Global Food Awards 2024' },
  { icon: BookOpen, title: 'Le Cordon Bleu', detail: 'Grand Diplome, Paris' },
]

export default function ChefSelection() {
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
    <section className="chef-section section-spacing" id="chef" ref={sectionRef}>
      <div className="container">
        <div className="chef-content" ref={contentRef}>
          <div className="chef-visual">
            <div className="chef-portrait">
              <ChefHat size={80} strokeWidth={0.8} color="var(--copper)" style={{ position: 'relative', zIndex: 2 }} />
              <div className="chef-portrait-accent">
                <span className="chef-portrait-accent-number">18</span>
                <span className="chef-portrait-accent-text">Years</span>
              </div>
            </div>
          </div>

          <div className="chef-info">
            <div className="overline">The Chef</div>
            <h2 className="heading-lg">Marcus Bellamy</h2>
            <p className="body-lg">
              Trained in Paris, refined in Tokyo, and inspired by the bold
              flavors of American grill culture. Chef Bellamy brings eighteen
              years of culinary excellence to every plate at BLACK DISTRICT.
            </p>
            <p className="body-md" style={{ color: 'var(--silver)' }}>
              His philosophy is deceptively simple: source the best, respect
              the ingredient, and never serve anything he wouldn't eat himself.
              Each burger is a study in balance — texture, temperature, and
              taste in perfect harmony.
            </p>

            <div className="chef-credentials">
              {credentials.map((c, i) => {
                const Icon = c.icon
                return (
                  <div className="chef-credential" key={i}>
                    <div className="chef-credential-icon">
                      <Icon size={20} strokeWidth={1.5} color="var(--copper)" />
                    </div>
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
