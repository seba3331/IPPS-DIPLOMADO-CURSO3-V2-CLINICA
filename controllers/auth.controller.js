

import * as service from '../services/auth.service.js'

export const registrar = async (req, res, next) => {
    try {
        const resultado = await service.registrar(req.body)
        return res.status(201).json(resultado)
    } catch (error) {
        return next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const resultado = await service.login(email, password)

        if (!resultado) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos' })
        }

        return res.json(resultado)
    } catch (error) {
        return next(error)
    }
}