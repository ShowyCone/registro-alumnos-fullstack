import { pool } from '../config/db.js'
import express from 'express'

const router = express.Router()

// Obtener todos los años académicos
router.get('/api/a%C3%B1os', (req, res) => {
  pool.query('SELECT * FROM AñosAcademicos', (error, results) => {
    if (error) {
      console.error(error)
      res.status(500).send('Ocurrió un error al realizar la consulta')
      return
    }
    res.json(results)
  })
})

// Agregar un nuevo año académico
router.post('/api/a%C3%B1os', (req, res) => {
  const { año } = req.body

  pool.query(
    'INSERT INTO AñosAcademicos (año) VALUES (?)',
    [año],
    (error, results) => {
      if (error) {
        console.error(error)
        res.status(500).send('Ocurrió un error al crear el año académico')
        return
      }
      res.status(201).send('Año académico creado con éxito')
    }
  )
})

export default router
