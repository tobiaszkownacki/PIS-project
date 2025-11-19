import React from 'react'
import { Link } from 'react-router-dom'
import './HowItWorks.css'

function HowItWorks() {
  return (
    <div className="how-it-works">
      <div className="container">
        <div className="hero-section">
          <h1>How HireMe! Works</h1>
          <p className="subtitle">
            Connecting service providers with customers has never been easier.
            Follow these simple steps to get started.
          </p>
        </div>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Create Your Account</h3>
              <p>
                Sign up for a free account in seconds. You'll need a valid email
                address to get started. No complicated forms or lengthy verification processes.
              </p>
              <div className="step-features">
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Free registration</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Email verification</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Instant access</span>
                </div>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Post Your Service</h3>
              <p>
                Create detailed service offers with clear descriptions, competitive pricing,
                and your service location. Add photos to make your offer stand out.
              </p>
              <div className="step-features">
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Add photos</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Set your price</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Choose location</span>
                </div>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Get Discovered</h3>
              <p>
                Your offers will appear in search results when customers look for
                services in your area. Use relevant categories and tags to improve visibility.
              </p>
              <div className="step-features">
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Search optimization</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Category filtering</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Location-based matching</span>
                </div>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Connect & Grow</h3>
              <p>
                Receive inquiries directly from interested customers, discuss project details,
                and build your reputation through reviews and completed jobs.
              </p>
              <div className="step-features">
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Direct messaging</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Review system</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Portfolio building</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of service providers who are already growing their business with HireMe!</p>
          <div className="cta-buttons">
            <Link to="/" className="btn btn-primary">
              Browse Services
            </Link>
            <button className="btn btn-secondary" onClick={() => window.location.href = '/#create-offer'}>
              Create Your First Offer
            </button>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Is HireMe! free to use?</h4>
              <p>Yes! Creating an account and posting service offers is completely free. We believe in helping service providers grow without upfront costs.</p>
            </div>
            <div className="faq-item">
              <h4>How do I get paid for my services?</h4>
              <p>You arrange payment directly with your customers. We recommend discussing payment terms before starting any work.</p>
            </div>
            <div className="faq-item">
              <h4>Can I edit my offers after posting?</h4>
              <p>Absolutely! You can edit your offers at any time from your "My Offers" dashboard.</p>
            </div>
            <div className="faq-item">
              <h4>What types of services can I offer?</h4>
              <p>You can offer any legal service including cleaning, gardening, driving, repairs, tutoring, and much more.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks