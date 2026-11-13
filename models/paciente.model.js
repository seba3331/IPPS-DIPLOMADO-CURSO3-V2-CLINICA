import mongoose from 'mongoose'

const pacienteSchema = new mongoose.Schema({
  identificacion: { type: String, required: true, trim: true, unique: true },
  nombre: { type: String, required: true, trim: true },
  fechaNacimiento: { type: Date },
  telefono: { type: String, trim: true },
  medico: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico', required: true },
}, { timestamps: true })

export const Paciente = mongoose.model('Paciente', pacienteSchema, 'pacientes')