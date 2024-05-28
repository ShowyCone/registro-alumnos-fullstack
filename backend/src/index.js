import express, { json } from 'express'
import cors from 'cors'

import añosRoutes from './routes/años.routes.js'
import materiasRoutes from './routes/materias.routes.js'
import estudiantesRoutes from './routes/estudiantes.routes.js'
import notasRoutes from './routes/notas.routes.js'
import loginRoutes from './routes/login.routes.js'

const app = express()

app.use(json())

app.use(cors())

app.use(añosRoutes)
app.use(materiasRoutes)
app.use(estudiantesRoutes)
app.use(notasRoutes)
app.use(loginRoutes)

app.listen(3000, () => {
  console.log('servidor ejecutandose en el puerto 3000')
})
