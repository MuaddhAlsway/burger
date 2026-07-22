export default function ReservationModal({ isOpen, onClose }) {
  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-overline">Reservations</div>
        <h3 className="modal-title">Reserve Your Table</h3>
        <p className="modal-desc">
          Secure your evening at BLACK DISTRICT. We recommend booking
          at least 48 hours in advance for weekend service.
        </p>

        <form className="modal-form" onSubmit={e => e.preventDefault()}>
          <div className="modal-form-row">
            <input className="modal-input" type="text" placeholder="First Name" />
            <input className="modal-input" type="text" placeholder="Last Name" />
          </div>
          <input className="modal-input" type="email" placeholder="Email Address" />
          <input className="modal-input" type="tel" placeholder="Phone Number" />
          <div className="modal-form-row">
            <input className="modal-input" type="date" />
            <select className="modal-select">
              <option value="">Select Time</option>
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
            <option value="">Party Size</option>
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
            <option>5 Guests</option>
            <option>6 Guests</option>
            <option>Private Dining (7+)</option>
          </select>
          <textarea
            className="modal-input"
            rows="3"
            placeholder="Special requests (dietary needs, celebrations, etc.)"
            style={{ resize: 'vertical' }}
          ></textarea>
          <button className="modal-submit" type="submit">Confirm Reservation</button>
        </form>
      </div>
    </div>
  )
}
