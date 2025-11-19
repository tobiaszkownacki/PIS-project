import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useOffers } from '../../context/OffersContext'
import { useAuth } from '../../context/AuthContext'
import './OfferCard.css'

function OfferCard({ offer, showActions = false, onEdit, onDelete }) {
  const navigate = useNavigate()
  const { formatPrice } = useOffers()
  const { isAuthenticated } = useAuth()

  const handleCardClick = () => {
    navigate(`/offers/${offer.id}`)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit(offer)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(offer.id)
  }

  return (
    <div className="offer-card" onClick={handleCardClick}>
      <div className="offer-image">
        {offer.image ? (
          <img src={offer.image} alt={offer.title} />
        ) : (
          <span>No Image</span>
        )}
      </div>

      <div className="offer-content">
        <div className="offer-category">{offer.category}</div>
        <h3 className="offer-title">{offer.title}</h3>
        <p className="offer-description">{offer.description}</p>

        <div className="offer-meta">
          <div className="offer-price">{formatPrice(offer.price)}</div>
          <div className="offer-location">
            📍 {offer.location}
          </div>
        </div>

        {showActions && isAuthenticated && (
          <div className="offer-actions">
            <button
              className="btn btn-secondary btn-small"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="btn btn-secondary btn-small"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default OfferCard