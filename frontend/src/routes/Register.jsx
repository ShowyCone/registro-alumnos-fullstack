import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/login.css'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    contraseña: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:3000/api/estudiantes/', formData)
      .then((response) => {
        console.log('Ítem creado con éxito:', response.data)

        // restablecer el formulario
        setFormData({
          nombre: '',
          apellido: '',
          cedula: '',
          contraseña: '',
        })

        navigate('/login')
      })
      .catch((error) => {
        console.error('Error al crear el ítem:', error)
      })
  }

  return (
    <>
      <h1>Registro</h1>
      <form className='form-input' onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          name='nombre'
          type='text'
          value={formData.nombre}
          onChange={handleChange}
        />
        <label>Apellido</label>
        <input
          name='apellido'
          type='text'
          value={formData.apellido}
          onChange={handleChange}
        />
        <label>Cedula</label>
        <input
          name='cedula'
          type='text'
          value={formData.cedula}
          onChange={handleChange}
        />
        <label>Contraseña</label>
        <input
          name='contraseña'
          type='password'
          value={formData.contraseña}
          onChange={handleChange}
        />
        <label>Confirmar contraseña</label>
        <input type='password' />
        <button type='submit'>Crear cuenta</button>
      </form>
      <p className='login-link'>
        ¿Ya tienes cuenta? <NavLink to='/login'>Inicia sesión</NavLink>
      </p>
    </>
  )
}

export default Register
