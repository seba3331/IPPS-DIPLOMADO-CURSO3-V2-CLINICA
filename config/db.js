import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/clinica'

export const conectar = async () => {
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a MongoDB')
}