import mongoose from 'mongoose'


// Define esquema de usuario
const userSchema = new mongoose.Schema({
username: { type: String, required: true, unique: true }, // Nombre único
password: { type: String, required: true }, // Contraseña hasheada
role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' } // Roles
})


export default mongoose.model('User', userSchema)