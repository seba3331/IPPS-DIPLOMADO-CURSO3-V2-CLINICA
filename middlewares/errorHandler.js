export const noEncontrado = (req, res) => {
  return res.status(404).json({ error: 'Ruta no encontrada' })
}

export const manejarError = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error)
  }
  if (error.code === 11000) {
    return res.status(409).json({ error: 'Ya existe un registro con esos datos' })
  }
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ error: error.message })
  }
  console.error(error)
  return res.status(500).json({ error: 'Error interno del servidor' })
}