import { Router } from "express"
import { proteger } from "../middlewares/proteger.js"
import * as controller from '../controllers/paciente.controller.js'

export const pacienteRoutes = Router()

pacienteRoutes.use(proteger)
pacienteRoutes.post('/', controller.crear)
pacienteRoutes.get('/', controller.listarPropios)
pacienteRoutes.get('/:id', controller.obtenerPropio)