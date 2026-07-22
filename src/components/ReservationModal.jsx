import { useLang } from '../i18n/LanguageContext'

export default function ReservationModal({ isOpen, onClose }) {
  const { t } = useLang()

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-overline">{t.modal.overline}</div>
        <h3 className="modal-title">{t.modal.title}</h3>
        <p className="modal-desc">{t.modal.desc}</p>

        <form className="modal-form" onSubmit={e => e.preventDefault()}>
          <div className="modal-form-row">
            <input className="modal-input" type="text" placeholder={t.modal.firstName} />
            <input className="modal-input" type="text" placeholder={t.modal.lastName} />
          </div>
          <input className="modal-input" type="email" placeholder={t.modal.email} />
          <input className="modal-input" type="tel" placeholder={t.modal.phone} />
          <div className="modal-form-row">
            <input className="modal-input" type="date" />
            <select className="modal-select">
              <option value="">{t.modal.selectTime}</option>
              <option>5:30 PM</option>
              <option>6:00 PM</option>
              <option>6:30 PM</option>
              <option>7:00 PM</option>
              <option>7:30 PM</option>
              <option>8:00 PM</option>
              <option>8:30 PM</option>
              <option>9:00 PM</option>
              <option>9:30 PM</option>
            </select>
          </div>
          <select className="modal-select">
            <option value="">{t.modal.partySize}</option>
            {t.modal.guestOptions.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
          <textarea
            className="modal-input"
            rows="3"
            placeholder={t.modal.specialRequests}
            style={{ resize: 'vertical' }}
          ></textarea>
          <button className="modal-submit" type="submit">{t.modal.submit}</button>
        </form>
      </div>
    </div>
  )
}
