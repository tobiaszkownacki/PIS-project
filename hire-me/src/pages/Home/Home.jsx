import React, { useState, useEffect } from 'react'
import { useOffers } from '../../context/OffersContext'
import { useAuth } from '../../context/AuthContext'
import FilterBar from '../../components/FilterBar/FilterBar'
import OfferCard from '../../components/OfferCard/OfferCard'
import './Home.css'

function Home({ onOpenModal }) {
  const { searchOffers } = useOffers()
  const { isAuthenticated } = useAuth()
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    sortBy: ''
  })
  const [offers, setOffers] = useState([])

  useEffect(() => {
    const filteredOffers = searchOffers(
      filters.search,
      filters.category,
      filters.location,
      filters.sortBy
    )
    setOffers(filteredOffers)
  }, [filters, searchOffers])

  const handleCreateOfferClick = () => {
    if (isAuthenticated) {
      onOpenModal('create-offer')
    } else {
      onOpenModal('login')
    }
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Find Trusted Local Services</h1>
          <p>From cleaning to gardening, find skilled professionals for any task at competitive prices.</p>
          <button
            className="btn btn-primary btn-hero"
            onClick={handleCreateOfferClick}
          >
            Create an Offer
          </button>
        </div>
      </section>

      {/* Offers Section */}
      <section className="offers-section">
        <div className="container">
          <FilterBar filters={filters} onFiltersChange={setFilters} />

          {offers.length === 0 ? (
            <div className="no-offers">
              <h3>No offers found</h3>
              <p>Try adjusting your search criteria or create a new offer.</p>
              {!isAuthenticated && (
                <p>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      onOpenModal('register')
                    }}
                  >
                    Sign up
                  </a> to create your first offer!
                </p>
              )}
            </div>
          ) : (
            <>
              <div className="offers-count">
                Found {offers.length} {offers.length === 1 ? 'offer' : 'offers'}
              </div>
              <div className="offers-grid">
                {offers.map(offer => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home