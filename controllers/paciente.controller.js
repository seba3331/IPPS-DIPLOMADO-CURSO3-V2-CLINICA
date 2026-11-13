import { Paciente } from '../models/paciente.model.js'

export const crear = async (req, res, next) => {
  try {
    const paciente = await Paciente.create({
      ...req.body,
      medico: req.medico.id,
    })
    return res.status(201).json(paciente)
  } catch (error) {
    return next(error)
  }
}

export const listarPropios = async (req, res, next) => {
  try {
    const pacientes = await Paciente.find({ medico: req.medico.id }).sort({ createdAt: -1 })
    return res.json(pacientes)
  } catch (error) {
    return next(error)
  }
}

export const obtenerPropio = async (req, res, next) => {
  try {
    const paciente = await Paciente.findById(req.params.id)
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' })
    }
    if (paciente.medico.toString() !== req.medico.id) {
      return res.status(403).json({ error: 'No tienes acceso a este paciente' })
    }
    return res.json(paciente)
  } catch (error) {
    return next(error)
  }
}

export const listarDeMedico = async (req, res, next) => {
  try {
    if (req.params.id !== req.medico.id) {
      return res.status(403).json({ error: 'Solo puedes consultar tus propios pacientes' })
    }
    const pacientes = await Paciente.find({ medico: req.medico.id }).sort({ createdAt: -1 })
    return res.json(pacientes)
  } catch (error) {
    return next(error)
  }
}