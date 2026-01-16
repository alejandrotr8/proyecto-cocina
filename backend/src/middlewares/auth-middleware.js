import jwt from 'jsonwebtoken'

// Middleware de autenticación
export const authenticate = (req, res, next) => {
  // Leemos el header Authorization
  const authHeader = req.headers.authorization

  // Si no hay header, no hay token
  if (!authHeader) {
    return res.status(401).json({ message: 'Token requerido' })
  }

  // Extraemos el token ("Bearer TOKEN")
  const token = authHeader.split(' ')[1]

  try {
    // Verificamos el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Guardamos los datos del usuario en la request
    // Aquí vienen id y role
    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' })
  }
}
