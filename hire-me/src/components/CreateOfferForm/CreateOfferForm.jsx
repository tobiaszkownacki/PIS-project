import React, { useState } from 'react'
import { useOffers } from '../../context/OffersContext'
import { useAuth } from '../../context/AuthContext'
import './CreateOfferForm.css'

function CreateOfferForm({ onSuccess, editOffer = null }) {
  const { createOffer, updateOffer } = useOffers()
  const { isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    title: editOffer?.title || '',
    description: editOffer?.description || '',
    price: editOffer?.price || '',
    location: editOffer?.location || '',
    category: editOffer?.category || '',
    image: editOffer?.image || ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const isEditing = !!editOffer

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      setErrors({ submit: 'Please log in to create an offer' })
      return
    }

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const offerData = {
        ...formData,
        price: parseFloat(formData.price)
      }

      let success
      if (isEditing) {
        success = updateOffer(editOffer.id, offerData)
      } else {
        success = createOffer(offerData)
      }

      if (success) {
        onSuccess()
        if (!isEditing) {
          setFormData({
            title: '',
            description: '',
            price: '',
            location: '',
            category: '',
            image: ''
          })
        }
      }
    } catch (error) {
      console.error('Offer creation error:', error)
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="create-offer-form">
      <h2>{isEditing ? 'Edit Offer' : 'Create New Offer'}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
            placeholder="e.g., Professional Window Cleaning"
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
            placeholder="Describe your service in detail..."
            rows="4"
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={errors.price ? 'error' : ''}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select Category</option>
              <option value="cleaning">Cleaning</option>
              <option value="gardening">Gardening</option>
              <option value="driving">Driving</option>
              <option value="repair">Repair</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={errors.location ? 'error' : ''}
            placeholder="e.g., Downtown, Suburbs"
          />
          {errors.location && <span className="error-message">{errors.location}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL (Optional)</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
          <small className="help-text">Paste a link to your service image</small>
        </div>

        {errors.submit && (
          <div className="error-message submit-error">{errors.submit}</div>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : (isEditing ? 'Update Offer' : 'Create Offer')}
        </button>
      </form>
    </div>
  )
}

export default CreateOfferForm