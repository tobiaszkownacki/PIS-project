import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { showNotification } from '../utils/helpers'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null)
  const [users, setUsers] = useLocalStorage('users', [])

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password)
    if (foundUser) {
      const userInfo = { ...foundUser }
      delete userInfo.password
      setUser(userInfo)
      showNotification('Login successful!', 'success')
      return true
    } else {
      showNotification('Invalid email or password', 'error')
      return false
    }
  }

  const register = (name, email, password) => {
    if (users.find(u => u.email === email)) {
      showNotification('User with this email already exists', 'error')
      return false
    }

    const newUser = {
      id: generateId(),
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    }

    setUsers([...users, newUser])

    const userInfo = { ...newUser }
    delete userInfo.password
    setUser(userInfo)

    showNotification('Account created successfully!', 'success')
    return true
  }

  const logout = () => {
    setUser(null)
    showNotification('Logged out successfully', 'info')
  }

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}