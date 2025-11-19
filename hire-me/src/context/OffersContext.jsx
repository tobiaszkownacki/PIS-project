import React, { createContext, useContext, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAuth } from './AuthContext'
import { formatPrice, generateId, showNotification } from '../utils/helpers'

const OffersContext = createContext()

export function useOffers() {
  const context = useContext(OffersContext)
  if (!context) {
    throw new Error('useOffers must be used within an OffersProvider')
  }
  return context
}

export function OffersProvider({ children }) {
  const [offers, setOffers] = useLocalStorage('offers', [])
  const { user } = useAuth()

  const createOffer = (offerData) => {
    if (!user) {
      showNotification('Please log in to create an offer', 'error')
      return false
    }

    const newOffer = {
      id: generateId(),
      userId: user.id,
      userName: user.name,
      ...offerData,
      createdAt: new Date().toISOString(),
      views: 0
    }

    setOffers([...offers, newOffer])
    showNotification('Offer created successfully!', 'success')
    return newOffer
  }

  const updateOffer = (id, offerData) => {
    const offerIndex = offers.findIndex(o => o.id === id)

    if (offerIndex === -1) return false

    if (offers[offerIndex].userId !== user.id) {
      showNotification('You can only edit your own offers', 'error')
      return false
    }

    const updatedOffers = [...offers]
    updatedOffers[offerIndex] = { ...updatedOffers[offerIndex], ...offerData }
    setOffers(updatedOffers)
    showNotification('Offer updated successfully!', 'success')
    return true
  }

  const deleteOffer = (id) => {
    const offerIndex = offers.findIndex(o => o.id === id)

    if (offerIndex === -1) return false

    if (offers[offerIndex].userId !== user.id) {
      showNotification('You can only delete your own offers', 'error')
      return false
    }

    const updatedOffers = offers.filter(o => o.id !== id)
    setOffers(updatedOffers)
    showNotification('Offer deleted successfully', 'success')
    return true
  }

  const getOfferById = (id) => {
    const offer = offers.find(o => o.id === id)

    if (offer) {
      // Increment views
      const updatedOffers = offers.map(o =>
        o.id === id ? { ...o, views: (o.views || 0) + 1 } : o
      )
      setOffers(updatedOffers)
    }

    return offer
  }

  const getUserOffers = () => {
    if (!user) return []
    return offers.filter(offer => offer.userId === user.id)
  }

  const searchOffers = (query = '', category = '', location = '', sortBy = '') => {
    let filteredOffers = [...offers]

    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase()
      filteredOffers = filteredOffers.filter(offer =>
        offer.title.toLowerCase().includes(lowercaseQuery) ||
        offer.description.toLowerCase().includes(lowercaseQuery)
      )
    }

    // Filter by category
    if (category) {
      filteredOffers = filteredOffers.filter(offer => offer.category === category)
    }

    // Filter by location
    if (location) {
      filteredOffers = filteredOffers.filter(offer =>
        offer.location.toLowerCase().includes(location.toLowerCase())
      )
    }

    // Sort offers
    if (sortBy === 'low-high') {
      filteredOffers.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'high-low') {
      filteredOffers.sort((a, b) => b.price - a.price)
    } else {
      // Default sort by creation date (newest first)
      filteredOffers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    return filteredOffers
  }

  const value = {
    offers,
    createOffer,
    updateOffer,
    deleteOffer,
    getOfferById,
    getUserOffers,
    searchOffers,
    formatPrice
  }

  return (
    <OffersContext.Provider value={value}>
      {children}
    </OffersContext.Provider>
  )
}