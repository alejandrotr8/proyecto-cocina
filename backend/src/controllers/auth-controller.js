import User from '../models/user-model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

/**
 * REGISTRO DE USUARIO
 * Crea un usuario nuevo en la base de datos
 */
export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body

    // Validación básica
    if (!username || !password) {
      return res.status(400).json({ message: 'Datos incompletos' })
    }

    // Comprobamos si el usuario ya existe
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(409).json({ message: 'Usuario ya existe' })
    }

    // Encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Creamos el usuario
    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || 'USER' // Por defecto USER
    })

    await newUser.save()

    res.status(201).json({ message: 'Usuario creado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error creando usuario' })
  }
}

/**
 * LOGIN DE USUARIO
 * Verifica credenciales y devuelve un JWT
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    // Buscamos el usuario
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }

    // Verificamos contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }

    // Creamos el token JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
