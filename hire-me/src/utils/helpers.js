// Format price
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Show notification (updated for bottom-right position)
export const showNotification = (message, type = 'info') => {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification')
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification
  const notification = document.createElement('div')
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Add styles for bottom-right position
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 12px;
    color: white;
    font-weight: 500;
    z-index: 1001;
    transform: translateY(100%);
    opacity: 0;
    transition: all 0.3s ease;
    max-width: 350px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    line-height: 1.4;
  `

  // Set background color based on type
  const colors = {
    success: '#10B981',
    error: '#EF4444',
    info: '#4F46E5',
    warning: '#F59E0B'
  }
  notification.style.backgroundColor = colors[type] || colors.info

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateY(0)'
    notification.style.opacity = '1'
  }, 100)

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.transform = 'translateY(100%)'
    notification.style.opacity = '0'
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 4000)
}