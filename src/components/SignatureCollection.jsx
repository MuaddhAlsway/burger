import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Beef, Flame, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const collection = [
  {
    id: 1, number: '01', name: 'The District',
    desc: 'Double wagyu patty, aged comte, black garlic aioli, house-pickled shallots on a charcoal brioche.',
    price: '$32', tag: 'Signature',
    icon: Beef
  },
  {
    id: 2, number: '02', name: 'Noir',
    desc: 'Black truffle wagyu, gruyere fondue, caramelized onion, truffle aioli on activated charcoal bun.',
    price: '$38', tag: 'Chef Favorite',
    icon: Flame
  },
  {
    id: 3, number: '03', name: 'The Founder',
    desc: 'Dry-aged prime beef, foie gras mousse, champagne reduction, micro herbs on brioche.',
    price: '$42', tag: 'Exclusive',
    icon: Award
  },
]

export default function SignatureCollection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

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
        { opacity: 0, y: 50 },
        {
          scrollTrigger: { trigger: gridRef.current, start: 'top 90%' },
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out'
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="collection-section section-spacing" id="collection" ref={sectionRef}>
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <div className="overline">Signature Collection</div>
          <h2 className="heading-lg">Three Icons.<br />One Philosophy.</h2>
          <p className="body-lg">
            Each creation in our signature collection represents months of
            refinement. No compromise. No concession. Only excellence.
          </p>
        </div>

        <div className="collection-grid" ref={gridRef}>
          {collection.map(item => {
            const Icon = item.icon
            return (
              <div className="collection-card" key={item.id}>
                <div className="collection-card-number">{item.number}</div>
                <div className="collection-card-icon-wrap">
                  <Icon size={48} strokeWidth={1} color="var(--copper)" />
                </div>
                <h3 className="collection-card-name">{item.name}</h3>
                <p className="collection-card-desc">{item.desc}</p>
                <div className="collection-card-meta">
                  <span className="collection-card-price">{item.price}</span>
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
