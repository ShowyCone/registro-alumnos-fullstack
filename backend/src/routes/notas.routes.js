import { pool } from '../config/db.js'
import express from 'express'

const router = express.Router()

// Obtener todas las notas
router.get('/api/notas/:id', (req, res) => {
  const { id } = req.params
  pool.query(
    'SELECT * FROM Notas where id_estudiante = ?',
    [id],
    (error, results) => {
      if (error) {
        console.error(error)
        res.status(500).send('Ocurrió un error al realizar la consulta')
        return
      }
      res.json(results)
    }
  )
})

router.get('/api/estudiante/:id_estudiante/materia/:id_materia', (req, res) => {
  const { id_estudiante, id_materia } = req.params
  pool.query(
    'SELECT nota1, nota2, nota3, promedio FROM Notas where id_estudiante = ? and id_materia = ?',
    [id_estudiante, id_materia],
    (error, results) => {
      if (error) {
        console.error(error)
        res.status(500).send('Ocurrió un error al realizar la consulta')
        return
      }
      res.json(results)
    }
  )
})

// Actualizar notas de un estudiante
router.put('/api/notas/:id', (req, res) => {
  const { id_nota } = req.params
  const { nota1, nota2, nota3 } = req.body

  pool.query(
    'UPDATE Notas SET nota1 = ?, nota2 = ?, nota3 = ?, promedio = ((nota1 + nota2 + nota3) / 3) WHERE id_nota = ?',
    [nota1, nota2, nota3, id_nota],
    (error, results) => {
      if (error) {
        console.error(error)
        res.status(500).send('Ocurrió un error al actualizar las notas')
        return
      }
      res.send('Notas actualizadas con éxito')
    }
  )
})

// Obtener estudiantes de un año académico y materia específicos
router.get('/api/estudiantes/year/:idYear/materia/:idMateria', (req, res) => {
  const { idYear, idMateria } = req.params
  pool.query(
    `SELECT 
      e.id,
      e.nombre,
      e.apellido,
      e.cedula,
      n.nota1,
      n.nota2,
      n.nota3,
      n.promedio
    FROM 
      Estudiantes e
    JOIN 
      Notas n ON e.id = n.id_estudiante
    JOIN 
      AñosAcademicos aa ON n.id_año = aa.id_año
    JOIN 
      Materias m ON n.id_materia = m.id_materia
    WHERE 
      aa.id_año = ? AND m.id_materia = ?`,
    [idYear, idMateria],
    (error, results) => {
      if (error) {
        console.error(error)
        res.status(500).send('Ocurrió un error al realizar la consulta')
        return
      }
      res.json(results)
    }
  )
})

// Insertar nuevas notas para un estudiante
router.post('/api/notas', (req, res) => {
  const { id_estudiante, id_materia, id_año, nota1, nota2, nota3, promedio } =
    req.body

  pool.query(
    'INSERT INTO Notas (id_estudiante, id_materia, id_año, nota1, nota2, nota3, promedio) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id_estudiante, id_materia, id_año, nota1, nota2, nota3, promedio],
    (error, results) => {
      if (error) {
        console.error(error)
        res.status(500).send('Ocurrió un error al insertar las notas')
        return
      }
      res.status(201).send('Notas insertadas con éxito')
    }
  )
})

// Obtener año academico de un estduiante
router.get('/api/year-estudiante/:id', (req, res) => {
  const { id } = req.params
  pool.query(
    'SELECT id_año FROM Notas where id_estudiante = ?',
    [id],
    (error, results) => {
      if (error) {
        console.error(error)
        res.status(500).send('Ocurrió un error al realizar la consulta')
        return
      }
      res.json(results)
    }
  )
})

export default router
