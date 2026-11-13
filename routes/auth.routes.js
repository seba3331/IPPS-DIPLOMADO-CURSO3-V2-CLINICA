import { Router } from "express"

import * as controller from '../controllers/auth.controller.js'

const authRoutes = Router()


authRoutes.post('/registro', controller.registrar)
authRoutes.post('/login', controller.login)

export { authRoutes }