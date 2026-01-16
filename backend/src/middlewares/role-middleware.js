// Middleware de autorización para ADMIN
export const authorizeAdmin = (req, res, next) => {
  // Si no hay usuario o no es ADMIN, se bloquea
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Permisos insuficientes' })
  }

  // Si es ADMIN, continúa
  next()
}
