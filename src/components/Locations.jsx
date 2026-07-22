import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TreePalm, Mountain, Waves, Cherry, Building2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const locations = [
  { icon: Building2, city: 'Manhattan', address: '142 Wooster Street, SoHo, New York, NY 10012', hours: 'Tue-Sun: 5:30PM - 11PM', open: true },
  { icon: TreePalm, city: 'Beverly Hills', address: '9560 Wilshire Boulevard, Beverly Hills, CA 90212', hours: 'Tue-Sun: 5PM - 10:30PM', open: true },
  { icon: Building2, city: 'London', address: '26 Bruton Street, Mayfair, London W1J 6QJ', hours: 'Wed-Sun: 6PM - 11PM', open: true },
  { icon: Waves, city: 'Miami Beach', address: '321 Collins Avenue, Miami Beach, FL 33139', hours: 'Thu-Mon: 6PM - 12AM', open: false },
  { icon: Mountain, city: 'Aspen', address: '315 East Hyman Avenue, Aspen, CO 81611', hours: 'Seasonal: 5:30PM - 10PM', open: true },
  { icon: Cherry, city: 'Tokyo', address: 'Minami-Aoyama 5-6-23, Minato-ku, Tokyo', hours: 'Mon-Sat: 6PM - 11PM', open: true },
]

export default function Locations() {
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
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: gridRef.current, start: 'top 90%' },
          opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out'
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="locations-section section-spacing" id="locations" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-center" ref={headerRef}>
          <div className="overline">Find Us</div>
          <h2 className="heading-lg">Six Cities.<br />One <em className="copper-text">Standard.</em></h2>
          <p className="body-lg">
            Each location is designed to reflect its neighborhood while
            maintaining the BLACK DISTRICT experience you expect.
          </p>
        </div>

        <div className="locations-grid" ref={gridRef}>
          {locations.map((loc, i) => {
            const Icon = loc.icon
            return (
              <div className="location-card" key={i}>
                <div className="location-card-icon">
                  <Icon size={24} strokeWidth={1.2} color="var(--copper)" />
                </div>
                <h3 className="location-card-city">{loc.city}</h3>
                <p className="location-card-address">{loc.address}</p>
                <div className="location-card-hours">{loc.hours}</div>
                <div className={`location-card-status ${loc.open ? 'open' : 'closed'}`}>
                  <span className="location-card-status-dot"></span>
                  {loc.open ? 'Accepting Reservations' : 'Currently Closed'}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
