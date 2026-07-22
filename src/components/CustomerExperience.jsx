import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const reviews = [
  {
    text: 'The District burger was a revelation. The wagyu patty melted like butter, and the black garlic aioli added a depth of flavor I have never experienced before. Absolutely world-class.',
    name: 'Victoria Sterling',
    detail: 'Editor, Luxe Dining Magazine',
    avatar: 'VS',
    rating: 5,
  },
  {
    text: 'BLACK DISTRICT redefined what I thought a burger could be. The attention to detail — from the Charcoal brioche to the pickled shallots — is nothing short of extraordinary.',
    name: 'Jonathan Reed',
    detail: 'Michelin Guide Inspector',
    avatar: 'JR',
    rating: 5,
  },
  {
    text: 'I have dined at three-star restaurants across Europe and Asia. The Obsidian at BLACK DISTRICT belongs in that conversation. An extraordinary culinary experience.',
    name: 'Amara Chen',
    detail: 'Food Critic, The New York Times',
    avatar: 'AC',
    rating: 5,
  },
  {
    text: 'Every detail speaks of obsession and craft. The truffle aioli, the perfectly toasted brioche, the temperature of the patty — nothing is left to chance.',
    name: 'Marcus Hale',
    detail: 'Chef, The Fat Duck',
    avatar: 'MH',
    rating: 5,
  },
  {
    text: 'I brought my entire executive team here. Every single one of them said it was the best burger they have ever had. We now hold all our dinners here.',
    name: 'Elena Vasquez',
    detail: 'CEO, Meridian Capital',
    avatar: 'EV',
    rating: 5,
  },
  {
    text: 'This is not a restaurant. This is a statement. BLACK DISTRICT proves that a burger can be as refined and memorable as any Michelin-starred dish.',
    name: 'David Park',
    detail: 'Food Writer, Bon Appetit',
    avatar: 'DP',
    rating: 5,
  },
]

const doubledReviews = [...reviews, ...reviews]

export default function CustomerExperience() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const trackRef = useRef(null)
  const tickerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out'
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!trackRef.current || !tickerRef.current) return

    const track = trackRef.current
    const halfWidth = track.scrollWidth / 2

    const anim = gsap.to(track, {
      x: -halfWidth,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })

    return () => {
      anim.kill()
    }
  }, [])

  return (
    <section className="experience-section section-spacing" id="experience" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-center" ref={headerRef}>
          <div className="overline">The Experience</div>
          <h2 className="heading-lg">Words From Those<br />Who <em className="copper-text">Understand.</em></h2>
          <p className="body-lg">
            Critically acclaimed by the world's most discerning palates.
            Here is what they have to say.
          </p>
        </div>
      </div>

      <div className="experience-ticker" ref={tickerRef}>
        <div className="experience-track" ref={trackRef}>
          {doubledReviews.map((r, i) => (
            <div className="experience-card" key={i}>
              <div className="experience-card-stars">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="var(--copper)" color="var(--copper)" />
                ))}
              </div>
              <p className="experience-card-text">"{r.text}"</p>
              <div className="experience-card-author">
                <div className="experience-card-avatar">{r.avatar}</div>
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
