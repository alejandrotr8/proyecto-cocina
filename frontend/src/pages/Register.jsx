import React, { useState } from 'react'

import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username,
        password,
        role: 'USER', // Siempre registramos como USER
      });
      alert('Usuario registrado correctamente');
      window.location.href = '/'; // Redirigimos al login
    } catch (err) {
      alert(err.response?.data?.message || 'Error al registrar usuario');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>Registro de Usuario</h1>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default Register;
