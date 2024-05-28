import { config } from 'dotenv'
import { pool } from '../config/db.js'
import express from 'express'
import jwt from 'jsonwebtoken'
config()

const router = express.Router()

router.post('/api/login', (req, res) => {
  const { usuario, contraseña } = req.body

  // Primero intenta encontrar al usuario en la tabla de Estudiantes
  pool.query(
    'SELECT * FROM Estudiantes WHERE cedula = ?',
    [usuario],
    (error, results) => {
      if (error) {
        console.error(error)
        res.status(500).send('Ocurrió un error al buscar el usuario')
        return
      }
      if (results.length > 0) {
        const usuarioEncontrado = results[0]
        // Aquí implementarías la lógica de verificación de la contraseña
        if (usuarioEncontrado.contraseña === contraseña) {
          // Crear el token con la información que se va incluir
          const token = jwt.sign(
            { id: usuarioEncontrado.id, cedula: usuarioEncontrado.cedula },
            process.env.SECRET_JWT,
            { expiresIn: '1h' } // El token expira en 1 hora
          )
          res.json({ token, rol: 'estudiante' })
        } else {
          res.status(401).send('Contraseña incorrecta')
        }
      } else {
        // Si no se encuentra en Estudiantes, busca en Administradores
        pool.query(
          'SELECT * FROM Administradores WHERE cedula = ?',
          [usuario],
          (error, results) => {
            if (error) {
              console.error(error)
              res
                .status(500)
                .send('Ocurrió un error al buscar el administrador')
              return
            }
            if (results.length > 0) {
              const adminEncontrado = results[0]
              // Aquí implementarías la lógica de verificación de la contraseña
              if (adminEncontrado.contraseña === contraseña) {
                // Crear el token con la información que se va incluir
                const token = jwt.sign(
                  { id: adminEncontrado.id, cedula: adminEncontrado.cedula },
                  process.env.SECRET_JWT,
                  { expiresIn: '1h' } // El token expira en 1 hora
                )
                res.json({ token, rol: 'admin' })
              } else {
                res.status(401).send('Contraseña incorrecta')
              }
            } else {
              res.status(404).send('Usuario no encontrado')
            }
          }
        )
      }
    }
  )
})

export default router
