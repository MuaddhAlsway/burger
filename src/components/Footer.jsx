import { Globe, AtSign, Users } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

export default function Footer({ onReserve }) {
  const { t } = useLang()

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
            <p className="footer-brand-desc">{t.footer.brandDesc}</p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <AtSign size={16} strokeWidth={1.5} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Website">
                <Globe size={16} strokeWidth={1.5} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Community">
                <Users size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>{t.footer.experience.title}</h4>
            <ul>
              <li><a href="#collection">{t.footer.experience.sigCollection}</a></li>
              <li><a href="#collection">{t.footer.experience.limitedEd}</a></li>
              <li><a href="#private">{t.footer.experience.privateDining}</a></li>
              <li><a href="#philosophy">{t.footer.experience.philosophy}</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{t.footer.company.title}</h4>
            <ul>
              <li><a href="#">{t.footer.company.about}</a></li>
              <li><a href="#chef">{t.footer.company.chef}</a></li>
              <li><a href="#">{t.footer.company.careers}</a></li>
              <li><a href="#">{t.footer.company.press}</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{t.footer.connect.title}</h4>
            <ul>
              <li><a href="#locations">{t.footer.connect.locations}</a></li>
              <li><a href="#">{t.footer.connect.giftCards}</a></li>
              <li><a href="#">{t.footer.connect.contact}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onReserve(); }}>{t.footer.connect.reservations}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">{t.footer.copyright}</p>
          <div className="footer-bottom-links">
            <a href="#">{t.footer.privacy}</a>
            <a href="#">{t.footer.terms}</a>
            <a href="#">{t.footer.accessibility}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
