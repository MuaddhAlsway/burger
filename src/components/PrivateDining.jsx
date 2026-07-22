import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GlassWater, Music, Lightbulb, FileText, Car, Flower2, CircleDot } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const amenities = [
  { icon: CircleDot, text: 'Dedicated sommelier' },
  { icon: Music, text: 'Private sound system' },
  { icon: Lightbulb, text: 'Bespoke lighting' },
  { icon: FileText, text: 'Custom menu curation' },
  { icon: Car, text: 'Valet parking' },
  { icon: Flower2, text: 'Floral arrangements' },
]

export default function PrivateDining({ onReserve }) {
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
    <section className="private-section section-spacing" id="private" ref={sectionRef}>
      <div className="container">
        <div className="private-content" ref={contentRef}>
          <div className="private-info">
            <div className="overline">Private Dining</div>
            <h2 className="heading-lg">Your Table.<br />Your Rules.</h2>
            <p className="body-lg">
              Our private dining rooms offer an intimate setting for those who
              value discretion and excellence. From executive dinners to
              celebration evenings, every detail is tailored to your vision.
            </p>

            <div className="private-amenities">
              {amenities.map((a, i) => {
                const Icon = a.icon
                return (
                  <div className="private-amenity" key={i}>
                    <div className="private-amenity-icon">
                      <Icon size={18} strokeWidth={1.5} color="var(--copper)" />
                    </div>
                    <span className="private-amenity-text">{a.text}</span>
                  </div>
                )
              })}
            </div>

            <div className="private-cta">
              <button className="btn-copper" onClick={onReserve}>Book Private Dining</button>
              <button className="btn-outline">View Floor Plan</button>
            </div>
          </div>

          <div className="private-visual">
            <div className="private-room">
              <GlassWater size={64} strokeWidth={0.8} color="var(--copper)" style={{ position: 'relative', zIndex: 2 }} />
              <div className="private-room-glass">
                <div className="private-room-info">
                  <span className="private-room-label">Starting From</span>
                  <span className="private-room-value">$2,500 per evening</span>
                </div>
                <div className="private-room-capacity">
                  <div className="private-room-capacity-number">2-20</div>
                  <div className="private-room-capacity-label">Guests</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
