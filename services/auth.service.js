
import { Medico } from '../models/medico.model.js'


import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRA } from '../config/jwt.js'

const firmarToken = (medico) =>{
    const token =  jwt.sign(
    { id: medico._id, email: medico.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRA }
  )

  return token
}
  

export const registrar = async ( datos ) =>{
  const medico = await Medico.create(datos)
  const token = firmarToken(medico)
  return { medico, token }
}


export const login = async (email, password) =>{
    const medico = await Medico.findOne({ email })
    if(!medico) return null

    const ok = await medico.compararPassword(password)
    if(!ok) return null

  const token = firmarToken(medico)
  return { medico, token }
}