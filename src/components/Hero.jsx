import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Flame, Beef, Wine, Leaf, Droplets } from 'lucide-react'

export default function Hero({ onReserve }) {
  const heroRef = useRef(null)
  const overlineRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const actionsRef = useRef(null)
  const displayRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.to(overlineRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'
      })
      .from(titleRef.current, {
        opacity: 0, y: 60, duration: 1.2, ease: 'power3.out'
      }, '-=0.4')
      .from(subtitleRef.current, {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out'
      }, '-=0.6')
      .from(actionsRef.current.children, {
        opacity: 0, y: 20, duration: 0.6, stagger: 0.12, ease: 'power3.out'
      }, '-=0.4')
      .from(displayRef.current, {
        opacity: 0, scale: 0.85, y: 40, duration: 1.4, ease: 'power3.out'
      }, '-=1')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg-layer">
        <div className="hero-gradient"></div>
        <div className="hero-vignette"></div>
        <div className="hero-smoke-container">
          <div className="hero-smoke"></div>
          <div className="hero-smoke"></div>
          <div className="hero-smoke"></div>
          <div className="hero-smoke"></div>
        </div>
      </div>

      <div className="hero-burger-display" ref={displayRef}>
        <div className="hero-burger-glow"></div>
        <div className="hero-burger-ring hero-burger-ring-2"></div>
        <div className="hero-burger-ring hero-burger-ring-3"></div>
        <div className="hero-burger-icon-wrap">
          <Beef size={120} strokeWidth={1} color="var(--copper)" />
        </div>
        <span className="hero-floating-particle"><Wine size={24} strokeWidth={1.5} color="var(--copper-soft)" /></span>
        <span className="hero-floating-particle"><Droplets size={22} strokeWidth={1.5} color="var(--silver)" /></span>
        <span className="hero-floating-particle"><Leaf size={22} strokeWidth={1.5} color="var(--silver)" /></span>
        <span className="hero-floating-particle"><Flame size={20} strokeWidth={1.5} color="var(--copper-soft)" /></span>
      </div>

      <div className="hero-content">
        <div className="hero-overline" ref={overlineRef} style={{ transform: 'translateY(20px)' }}>
          Est. 2024 — Premium Burger Atelier
        </div>
        <h1 className="hero-title" ref={titleRef}>
          Crafted Beyond<br /><em>Ordinary.</em>
        </h1>
        <p className="hero-subtitle" ref={subtitleRef}>
          A new standard for premium burgers, prepared with exceptional
          ingredients and obsessive attention to detail.
        </p>
        <div className="hero-actions" ref={actionsRef}>
          <button className="btn-copper" onClick={onReserve}>Reserve a Table</button>
          <button className="btn-outline">Explore Menu</button>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  )
}
