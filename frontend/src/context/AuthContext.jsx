import React, { createContext, useState, useEffect } from 'react'

// Creamos el contexto
export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    role: null,
    isAuthenticated: false
  })

  // Al cargar la app, intentamos recuperar el token
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      try {
        // Decodificamos el JWT manualmente (sin librerías)
        const payload = JSON.parse(atob(token.split('.')[1]))

        setAuth({
          token,
          role: payload.role, // 👈 ROL REAL
          isAuthenticated: true
        })
      } catch {
        localStorage.removeItem('token')
      }
    }
  }, [])

  // Login
  const login = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]))

    localStorage.setItem('token', token)

    setAuth({
      token,
      role: payload.role,
      isAuthenticated: true
    })
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('token')

    setAuth({
      token: null,
      role: null,
      isAuthenticated: false
    })

    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
