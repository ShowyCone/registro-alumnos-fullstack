import { pool } from '../config/db.js'
import express from 'express'

const router = express.Router()

// Obtener todas las materias
router.get('/api/materias', (req, res) => {
  pool.query('SELECT * FROM Materias', (error, results) => {
    if (error) {
      console.error(error)
      res.status(500).send('Ocurrió un error al realizar la consulta')
      return
    }
    res.json(results)
  })
})

// Agregar una nueva materia
router.post('/api/materias', (req, res) => {
  const { nombre_materia } = req.body

  pool.query(
    'INSERT INTO Materias (nombre_materia) VALUES (?)',
    [nombre_materia],
    (error, results) => {
      if (error) {
        console.error(error)
        res.status(500).send('Ocurrió un error al crear la materia')
        return
      }
      res.status(201).send('Materia creada con éxito')
    }
  )
})

export default router
