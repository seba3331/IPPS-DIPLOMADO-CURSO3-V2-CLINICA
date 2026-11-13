# Clínica API

API REST para registrar médicos y administrar pacientes asociados a su médico tratante.

## Requisitos

- Node.js 20 o superior
- Yarn 1.x
- MongoDB en ejecución, local o remoto

## Puesta en marcha

Desde la carpeta del proyecto, configura las variables de entorno:

```bash
export MONGODB_URI="mongodb://127.0.0.1:27017/clinica"
export JWT_SECRET="cambia-esta-clave-por-una-propia"
```

Instala dependencias e inicia el servidor:

```bash
yarn install
yarn dev
```

La API queda disponible en `http://localhost:3001`. Para iniciar sin modo de desarrollo usa `yarn start`. `yarn run check` valida la sintaxis de los módulos.

## Rutas

Todas las respuestas usan JSON. Las rutas de pacientes y la lista por médico requieren `Authorization: Bearer <token>`.

| Método | Ruta | Resultado |
| --- | --- | --- |
| `POST` | `/auth/registro` | Registra un médico y devuelve su token (`201`). |
| `POST` | `/auth/login` | Inicia sesión y devuelve un token (`200`, credenciales incorrectas `401`). |
| `POST` | `/pacientes` | Crea un paciente para el médico autenticado (`201`). |
| `GET` | `/pacientes` | Lista los pacientes del médico autenticado. |
| `GET` | `/pacientes/:id` | Obtiene un paciente propio; devuelve `403` si pertenece a otro médico. |
| `GET` | `/medicos/:id/pacientes` | Lista los pacientes del médico autenticado; devuelve `403` si el `id` no coincide con el médico del token. |

El registro de médico espera `nombre`, `especialidad`, `email` y `password` (mínimo 6 caracteres). Crear un paciente espera `identificacion` y `nombre`; `fechaNacimiento` y `telefono` son opcionales. Una identificación de paciente o correo de médico repetidos producen `409`. Una ruta protegida sin token o con un token inválido produce `401`.

## Relación y autorización

Cada documento de paciente guarda la referencia `medico` con el identificador del médico tratante. Esa referencia se toma del JWT verificado, no del cuerpo enviado por el cliente, para que el médico no pueda asignar pacientes a otra cuenta. Al consultar un paciente individual se compara esa referencia con el identificador autenticado; en `/medicos/:id/pacientes` también se comprueba que el ID de la ruta corresponda al token antes de consultar la base de datos.

## Diagnóstico de la Parte 0

Se revisaron primero los mensajes del arranque y luego se compararon las rutas e imports con los nombres de archivo reales. Eso permitió encontrar el import de `auth.route.js` cuando el archivo se llamaba `auth.routes.js`, el alias de `config/db.js` sin configurar, la URI de MongoDB vacía y el `consolelog` inexistente. Al seguir el flujo de registro hasta el controlador también se vio que devolvía el resultado sin responder por HTTP; en los modelos se detectaron imports ausentes y que `paciente.model.js` repetía el esquema de médico. `yarn run check` sirve para repetir la revisión sintáctica; para confirmar el flujo completo también se requiere MongoDB en ejecución y ejecutar la colección Postman.

## Demostración en Postman

Importa `postman/Clinica API.postman_collection.json`, confirma que su variable `baseUrl` apunte a `http://localhost:3001` y ejecuta la colección en orden. La colección crea dos médicos con correos únicos por ejecución y recorre el rechazo sin token (`401`), la lista `/:id/pacientes`, el intento de acceso cruzado (`403`) y la identificación duplicada (`409`).

El video debe mostrar Postman con los códigos HTTP legibles y explicar por qué la relación paciente-médico se guarda en el paciente, dónde se aplica la autorización y cómo se verificaron los problemas de la Parte 0.

**Video de demostración:** pendiente de agregar el enlace público después de grabar y publicar el video.

## Fork y commits

El fork debe crearse desde GitHub con visibilidad pública. Después de clonar tu fork, conserva un commit separado por cada parte de la entrega y sube los cambios con `git push`. No publiques secretos reales; configura `MONGODB_URI` y `JWT_SECRET` localmente.