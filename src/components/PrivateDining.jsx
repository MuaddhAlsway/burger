import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GlassWater, Music, Lightbulb, FileText, Car, Flower2, CircleDot } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const amenityIcons = [CircleDot, Music, Lightbulb, FileText, Car, Flower2]

export default function PrivateDining({ onReserve }) {
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
    <section className="private-section section-spacing" id="private" ref={sectionRef}>
      <div className="container">
        <div className="private-content" ref={contentRef}>
          <div className="private-info">
            <div className="overline">{t.private.overline}</div>
            <h2 className="heading-lg">{t.private.title1}<br />{t.private.title2}</h2>
            <p className="body-lg">{t.private.subtitle}</p>
            <div className="private-amenities">
              {t.private.amenities.map((a, i) => {
                const Icon = amenityIcons[i]
                return (
                  <div className="private-amenity" key={i}>
                    <div className="private-amenity-icon"><Icon size={18} strokeWidth={1.5} color="var(--copper)" /></div>
                    <span className="private-amenity-text">{a}</span>
                  </div>
                )
              })}
            </div>
            <div className="private-cta">
              <button className="btn-copper" onClick={onReserve}>{t.private.bookCta}</button>
              <button className="btn-outline">{t.private.floorPlanCta}</button>
            </div>
          </div>
          <div className="private-visual">
            <div className="private-room">
              <GlassWater size={64} strokeWidth={0.8} color="var(--copper)" style={{ position: 'relative', zIndex: 2 }} />
              <div className="private-room-glass">
                <div className="private-room-info">
                  <span className="private-room-label">{t.private.startingFrom}</span>
                  <span className="private-room-value">{t.private.pricePerEvening}</span>
                </div>
                <div className="private-room-capacity">
                  <div className="private-room-capacity-number">2-20</div>
                  <div className="private-room-capacity-label">{t.private.guests}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
