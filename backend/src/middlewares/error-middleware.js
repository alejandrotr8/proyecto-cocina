export default function errorHandler(err, req, res, next) {
console.error(err) // Log de error
res.status(500).json({ message: 'Error interno del servidor' })
}