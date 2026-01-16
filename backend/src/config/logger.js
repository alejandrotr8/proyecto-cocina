import winston from 'winston'


// Configuración de Winston para logging profesional
const logger = winston.createLogger({
level: 'info', // Nivel de logs
format: winston.format.combine(
winston.format.timestamp(), // Añade timestamp
winston.format.json() // Formato JSON
),
transports: [
new winston.transports.Console(), // Mostrar en consola
new winston.transports.File({ filename: 'logs/server.log' }) // Guardar en archivo
]
})


export default logger