import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useOffers } from '../../context/OffersContext'
import { useAuth } from '../../context/AuthContext'
import { showNotification } from '../../utils/helpers'
import './OfferDetail.css'

function OfferDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getOfferById, formatPrice } = useOffers()
  const { isAuthenticated } = useAuth()
  const [offer, setOffer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const foundOffer = getOfferById(id)
    setOffer(foundOffer)
    setIsLoading(false)
  }, [id, getOfferById])

  const handleContact = () => {
    if (!isAuthenticated) {
      showNotification('Please log in to contact service providers', 'info')
      return
    }
    // In a real app, this would open a contact form or chat
    showNotification(`Contacting ${offer.userName}...`, 'info')
  }

  const handleBack = () => {
    navigate(-1)
  }

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">Loading offer details...</div>
      </div>
    )
  }

  if (!offer) {
    return (
      <div className="container">
        <div className="not-found">
          <h2>Offer not found</h2>
          <p>The offer you're looking for doesn't exist or has been removed.</p>
          <button className="btn btn-primary" onClick={handleBack}>
            Back to Offers
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="offer-detail">
      <div className="container">
        <button className="back-button" onClick={handleBack}>
          ← Back to Offers
        </button>

        <div className="detail-content">
          <div className="detail-image">
            {offer.image ? (
              <img src={offer.image} alt={offer.title} />
            ) : (
              <span>No Image Available</span>
            )}
          </div>

          <div className="detail-info">
            <div className="detail-category">{offer.category}</div>
            <h1>{offer.title}</h1>
            <div className="detail-price">{formatPrice(offer.price)}</div>

            <div className="detail-location">
              📍 {offer.location}
            </div>

            <div className="detail-meta">
              <div className="meta-item">
                <strong>Posted by:</strong> {offer.userName}
              </div>
              <div className="meta-item">
                <strong>Views:</strong> {offer.views || 0}
              </div>
              <div className="meta-item">
                <strong>Posted:</strong> {new Date(offer.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="detail-description">
              <h3>Service Description</h3>
              <p>{offer.description}</p>
            </div>

            <div className="detail-contact">
              <button
                className="btn btn-primary contact-btn"
                onClick={handleContact}
              >
                Contact Provider
              </button>
              {!isAuthenticated && (
                <p className="login-prompt">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      navigate('/')
                    }}
                  >
                    Log in
                  </a> to contact service providers
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfferDetail