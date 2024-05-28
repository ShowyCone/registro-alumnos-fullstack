import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import { NavLink, useNavigate } from 'react-router-dom'
import { GlobalDataContext } from '../contexts/GlobalDataProvider'
import '../styles/login.css'

const Login = () => {
  const [cedula, setCedula] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [dataMatch, setDataMatch] = useState(false)
  const [incorrectData, setIncorrectData] = useState(false)
  const { allData, setAllData } = useContext(GlobalDataContext)
  const navigate = useNavigate()

  useEffect(() => {
    console.log('reset')
    setCedula('')
    setContraseña('')
    setDataMatch(false)
    setIncorrectData(false)
  }, [])

  useEffect(() => {
    if (dataMatch) console.log('ahoraaaaaaaaaaaaaaaaaaa!!!!!!!!!!!!')
  }, [dataMatch])

  const handleIncorrectData = () => {
    setIncorrectData(true)
    setTimeout(() => {
      setIncorrectData(false)
    }, 3000)
  }

  const getData = (id) => {
    axios
      .get(`https://registro-alumnos-fullstack.onrender.com/api/notas/${id}`)
      .then((response) => {
        if (response.data[0]) {
          setAllData([...response.data])
          console.log(response.data)
        } else {
          setAllData([''])
        }
      })
      .catch((error) => {
        console.error('Hubo un error al obtener los datos:', error)
      })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    axios
      .get('https://registro-alumnos-fullstack.onrender.com/api/estudiantes/')
      .then((response) => {
        const user = response.data.find(
          (i) => i.cedula === cedula && i.contraseña === contraseña
        )
        if (user) {
          if (cedula === '29907054') {
            setDataMatch(true)
            navigate('/admin')
          } else {
            getData(user.id)
            console.log('* se abre el chat *')
          }
        } else {
          handleIncorrectData()
        }
      })
      .catch((error) => {
        console.error('Hubo un error al obtener los datos:', error)
      })
  }

  useEffect(() => {
    if (allData.length > 0) {
      navigate('/chat')
    }
  }, [allData, navigate])

  return (
    <>
      <h1>Inicio de Sesión</h1>
      <form onSubmit={handleLogin} className='form-input'>
        <label htmlFor='cedula'>Cedula</label>
        <input
          type='text'
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />
        <label htmlFor='password'>Contraseña</label>
        <input
          type='password'
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <button type='submit'>Iniciar sesión</button>
      </form>
      <p className='login-link'>
        ¿No tienes cuenta? <NavLink to='/register'>Regístrate</NavLink>
      </p>
      <Slide direction='up' in={incorrectData} mountOnEnter unmountOnExit>
        <Alert
          variant='outlined'
          sx={{ background: 'white', position: 'absolute', bottom: '5px' }}
          severity='error'
        >
          Cedula o contraseña incorrecta.
        </Alert>
      </Slide>
    </>
  )
}

export default Login
