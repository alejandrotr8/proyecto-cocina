import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

// Hook personalizado para acceder al contexto
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  return context
}
