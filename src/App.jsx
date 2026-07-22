import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SignatureCollection from './components/SignatureCollection'
import LimitedEdition from './components/LimitedEdition'
import IngredientPhilosophy from './components/IngredientPhilosophy'
import ChefSelection from './components/ChefSelection'
import CustomerExperience from './components/CustomerExperience'
import PrivateDining from './components/PrivateDining'
import Gallery from './components/Gallery'
import Locations from './components/Locations'
import Footer from './components/Footer'
import ReservationModal from './components/ReservationModal'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [reserveOpen, setReserveOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="loader">
        <div className="loader-content">
          <div className="loader-line loader-line-1"></div>
          <div className="loader-line loader-line-2"></div>
          <div className="loader-brand">BLACK DISTRICT</div>
          <div className="loader-sub">Crafted Beyond Ordinary</div>
          <div className="loader-progress">
            <div className="loader-progress-fill"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Navbar onReserve={() => setReserveOpen(true)} />
      <Hero onReserve={() => setReserveOpen(true)} />
      <SignatureCollection />
      <LimitedEdition />
      <IngredientPhilosophy />
      <ChefSelection />
      <CustomerExperience />
      <PrivateDining onReserve={() => setReserveOpen(true)} />
      <Gallery />
      <Locations />
      <Footer onReserve={() => setReserveOpen(true)} />
      <ReservationModal isOpen={reserveOpen} onClose={() => setReserveOpen(false)} />
    </div>
  )
}

export default App
