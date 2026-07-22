import { Globe, AtSign, Users } from 'lucide-react'

export default function Footer({ onReserve }) {
  return (
    <footer className="footer section-spacing">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand-section">
            <div className="footer-brand-mark">
              <div className="footer-brand-mark-icon">
                <div className="footer-brand-mark-inner"></div>
              </div>
              <span className="footer-brand-name">BLACK DISTRICT</span>
            </div>
            <p className="footer-brand-desc">
              A luxury burger atelier for the discerning palate. Crafted
              beyond ordinary. Founded 2024.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <AtSign size={16} strokeWidth={1.5} color="var(--silver)" />
              </a>
              <a href="#" className="footer-social-link" aria-label="Website">
                <Globe size={16} strokeWidth={1.5} color="var(--silver)" />
              </a>
              <a href="#" className="footer-social-link" aria-label="Community">
                <Users size={16} strokeWidth={1.5} color="var(--silver)" />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Experience</h4>
            <ul>
              <li><a href="#collection">Signature Collection</a></li>
              <li><a href="#collection">Limited Editions</a></li>
              <li><a href="#private">Private Dining</a></li>
              <li><a href="#philosophy">Our Philosophy</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#chef">The Chef</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Connect</h4>
            <ul>
              <li><a href="#locations">Locations</a></li>
              <li><a href="#">Gift Cards</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onReserve(); }}>Reservations</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2026 <span>BLACK DISTRICT</span>. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
