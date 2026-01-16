import 'dotenv/config'; // carga variables de entorno

// Importa la app de Express configurada
import app from './app.js'



// Arranca el servidor en el puerto definido en .env
app.listen(process.env.PORT, () => {
console.log(`Servidor escuchando en puerto ${process.env.PORT}`)
})