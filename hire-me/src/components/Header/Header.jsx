import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Header.css'

function Header({ onOpenModal }) {
  const { user, logout, isAuthenticated } = useAuth()
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo">
            Hire<span>Me!</span>
          </Link>

          <div className="nav-links">
            <Link
                to="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
                Home
            </Link>

            {isAuthenticated && (
                <Link
                to="/my-offers"
                className={`nav-link ${isActive('/my-offers') ? 'active' : ''}`}
                >
                My Offers
                </Link>
            )}

            <Link
                to="/how-it-works"
                className={`nav-link ${isActive('/how-it-works') ? 'active' : ''}`}
            >
                How It Works
            </Link>
            <a href="#" className="nav-link">Contact</a>

            {isAuthenticated ? (
              <div className="auth-buttons">
                <span className="user-greeting">Hello, {user?.name}</span>
                <button
                  className="btn btn-primary"
                  onClick={() => onOpenModal('create-offer')}
                >
                  Create Offer
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={logout}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button
                  className="btn btn-secondary"
                  onClick={() => onOpenModal('login')}
                >
                  Log In
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => onOpenModal('register')}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header