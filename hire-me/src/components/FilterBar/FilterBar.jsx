import React from 'react'
import { debounce } from '../../utils/helpers'
import './FilterBar.css'

function FilterBar({ filters, onFiltersChange }) {
  const { search, category, location, sortBy } = filters

  const handleSearchChange = debounce((value) => {
    onFiltersChange({ ...filters, search: value })
  }, 300)

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <div className="filter-bar">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search for services..."
          defaultValue={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-options">
        <select
          value={category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="cleaning">Cleaning</option>
          <option value="gardening">Gardening</option>
          <option value="driving">Driving</option>
          <option value="repair">Repair</option>
          <option value="other">Other</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>

        <select
          value={location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="downtown">Downtown</option>
          <option value="suburbs">Suburbs</option>
          <option value="rural">Rural</option>
        </select>
      </div>
    </div>
  )
}

export default FilterBar