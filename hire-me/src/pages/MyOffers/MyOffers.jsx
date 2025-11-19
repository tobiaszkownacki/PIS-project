import React, { useState, useEffect } from 'react'
import { useOffers } from '../../context/OffersContext'
import { useAuth } from '../../context/AuthContext'
import OfferCard from '../../components/OfferCard/OfferCard'
import Modal from '../../components/Modal/Modal'
import CreateOfferForm from '../../components/CreateOfferForm/CreateOfferForm'
import './MyOffers.css'

function MyOffers({ onOpenModal }) {
  const { getUserOffers, deleteOffer } = useOffers()
  const { isAuthenticated } = useAuth()
  const [userOffers, setUserOffers] = useState([])
  const [editingOffer, setEditingOffer] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      setUserOffers(getUserOffers())
    }
  }, [isAuthenticated, getUserOffers])

  const handleEdit = (offer) => {
    setEditingOffer(offer)
    setShowEditModal(true)
  }

  const handleDelete = async (offerId) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      const success = deleteOffer(offerId)
      if (success) {
        setUserOffers(getUserOffers())
      }
    }
  }

  const handleEditSuccess = () => {
    setShowEditModal(false)
    setEditingOffer(null)
    setUserOffers(getUserOffers())
  }

  const handleCreateOfferClick = () => {
    onOpenModal('create-offer')
  }

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="not-authenticated">
          <h2>Please log in to view your offers</h2>
          <button
            className="btn btn-primary"
            onClick={() => onOpenModal('login')}
          >
            Log In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="my-offers">
      <div className="container">
        <div className="my-offers-header">
          <h2>My Offers</h2>
          <button
            className="btn btn-primary"
            onClick={handleCreateOfferClick}
          >
            Add New Offer
          </button>
        </div>

        {userOffers.length === 0 ? (
          <div className="no-offers">
            <h3>You haven't created any offers yet</h3>
            <p>Create your first offer to get started!</p>
            <button
              className="btn btn-primary"
              onClick={handleCreateOfferClick}
            >
              Create Your First Offer
            </button>
          </div>
        ) : (
          <div className="offers-grid">
            {userOffers.map(offer => (
              <OfferCard
                key={offer.id}
                offer={offer}
                showActions={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Edit Offer Modal */}
        {showEditModal && (
          <Modal onClose={() => setShowEditModal(false)}>
            <CreateOfferForm
              editOffer={editingOffer}
              onSuccess={handleEditSuccess}
            />
          </Modal>
        )}
      </div>
    </div>
  )
}

export default MyOffers