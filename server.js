import app from './app.js'
import { conectar } from './config/db.js'

const iniciar = async () => {
    await conectar()
    const puerto = process.env.PORT || 3001
    app.listen(puerto, () => {
        console.log(`API lista en http://localhost:${puerto}`)
    })
}

iniciar().catch((error) => {
    console.error('No se pudo iniciar la API:', error.message)
    process.exitCode = 1
})