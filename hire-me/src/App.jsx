import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import MyOffers from './pages/MyOffers/MyOffers'
import OfferDetail from './pages/OfferDetail/OfferDetail'
import HowItWorks from './pages/HowItWorks/HowItWorks'
import NotFound from './pages/NotFound/NotFound'
import Modal from './components/Modal/Modal'
import AuthForm from './components/AuthForm/AuthForm'
import CreateOfferForm from './components/CreateOfferForm/CreateOfferForm'
import { useAuth } from './context/AuthContext'
import './styles/globals.css'

function App() {
  const { user } = useAuth()
  const [activeModal, setActiveModal] = useState(null)

  const openModal = (modalName) => setActiveModal(modalName)
  const closeModal = () => setActiveModal(null)

  const switchAuthModal = () => {
    if (activeModal === 'login') {
      setActiveModal('register')
    } else if (activeModal === 'register') {
      setActiveModal('login')
    }
  }

  return (
    <div className="App">
      <Header onOpenModal={openModal} />

      <main>
        <Routes>
          <Route path="/" element={<Home onOpenModal={openModal} />} />
          <Route path="/offers/:id" element={<OfferDetail />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route
            path="/my-offers"
            element={
              user ? <MyOffers onOpenModal={openModal} /> : <Home onOpenModal={openModal} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Modals */}
      {activeModal === 'login' && (
        <Modal onClose={closeModal}>
          <AuthForm
            type="login"
            onSuccess={closeModal}
            onSwitchAuth={switchAuthModal}
          />
        </Modal>
      )}

      {activeModal === 'register' && (
        <Modal onClose={closeModal}>
          <AuthForm
            type="register"
            onSuccess={closeModal}
            onSwitchAuth={switchAuthModal}
          />
        </Modal>
      )}

      {activeModal === 'create-offer' && (
        <Modal onClose={closeModal}>
          <CreateOfferForm onSuccess={closeModal} />
        </Modal>
      )}
    </div>
  )
}

export default App