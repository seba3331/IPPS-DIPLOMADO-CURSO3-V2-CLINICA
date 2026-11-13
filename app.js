import express from 'express'
import cors from 'cors'
import { authRoutes } from './routes/auth.routes.js'
import { medicoRoutes } from './routes/medico.route.js'
import { pacienteRoutes } from './routes/paciente.route.js'
import { manejarError, noEncontrado } from './middlewares/errorHandler.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/pacientes', pacienteRoutes)
app.use('/medicos', medicoRoutes)
app.use(noEncontrado)
app.use(manejarError)

export default app