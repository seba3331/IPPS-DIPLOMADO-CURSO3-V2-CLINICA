import { Router } from 'express'
import { proteger } from '../middlewares/proteger.js'
import { listarDeMedico } from '../controllers/paciente.controller.js'

export const medicoRoutes = Router()

medicoRoutes.get('/:id/pacientes', proteger, listarDeMedico)