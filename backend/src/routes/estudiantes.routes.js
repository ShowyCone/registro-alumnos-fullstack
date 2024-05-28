import { pool } from '../config/db.js'
import express from 'express'

const router = express.Router()

router.get('/api/estudiantes', (req, res) => {
  pool.query('SELECT * FROM Estudiantes', (error, results) => {
    if (error) {
      console.error(error)
      res.status(500).send('Ocurrió un error al realizar la consulta')
      return
    }
    res.json(results)
  })
})

router.put('/api/estudiante-notas/:id', (req, res) => {
  const { id } = req.params
  const { nombre, cedula, apellido, nota1, nota2, nota3 } = req.body

  // Inicia una transacción para asegurar que ambas operaciones se realicen juntas
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión:', err)
      res.status(500).send('Error interno del servidor')
      return
    }

    connection.beginTransaction((err) => {
      if (err) {
        console.error('Error al iniciar la transacción:', err)
        res.status(500).send('Error interno del servidor')
        return
      }

      // Actualiza la tabla Estudiantes
      connection.query(
        'UPDATE Estudiantes SET nombre = ?, cedula = ?, apellido = ? WHERE id = ?',
        [nombre, cedula, apellido, id],
        (error, results) => {
          if (error) {
            return connection.rollback(() => {
              console.error('Error al actualizar Estudiantes:', error)
              res
                .status(500)
                .send('Ocurrió un error al actualizar el estudiante')
            })
          }

          // Actualiza la tabla Notas
          connection.query(
            'UPDATE Notas SET nota1 = ?, nota2 = ?, nota3 = ?, promedio = ((? + ? + ?) / 3) WHERE id_estudiante = ?',
            [nota1, nota2, nota3, nota1, nota2, nota3, id],
            (error, results) => {
              if (error) {
                return connection.rollback(() => {
                  console.error('Error al actualizar Notas:', error)
                  res
                    .status(500)
                    .send('Ocurrió un error al actualizar las notas')
                })
              }

              // Si todo está bien, confirma la transacción
              connection.commit((err) => {
                if (err) {
                  return connection.rollback(() => {
                    console.error('Error al confirmar la transacción:', err)
                    res.status(500).send('Error interno del servidor')
                  })
                }
                res.send('Estudiante y notas actualizados con éxito')
              })
            }
          )
        }
      )
    })
  })
})

router.post('/api/estudiantes', (req, res) => {
  const { nombre, cedula, apellido, contraseña } = req.body

  pool.query(
    'INSERT INTO Estudiantes (nombre, cedula, apellido, contraseña) VALUES (?, ?, ?, ?)',
    [nombre, cedula, apellido, contraseña],
    (error, results) => {
      if (error) {
        console.error(error)
        res.status(500).send('Ocurrió un error al crear el usuario')
        return
      }
      res.status(201).send('Usuario creado con éxito')
    }
  )
})

export default router
