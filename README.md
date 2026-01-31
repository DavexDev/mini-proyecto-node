VetClinic — Sistema de Reservas Veterinarias (Backend)

Prueba técnica de backend para un sistema de reservas de una clínica veterinaria.
El sistema permite a clientes registrar mascotas y agendar citas con veterinarios, gestionando servicios, estados de citas, pagos simulados y control de concurrencia para evitar doble reserva.

📌 Stack Tecnológico

Node.js >= 18

Express.js (framework HTTP)

PostgreSQL >= 14

JWT para autenticación

bcrypt para hash de contraseñas

Postman para testing manual

Docker (pendiente / opcional)

ℹ️ El proyecto fue desarrollado sin ORM para mantener control explícito de la lógica y facilitar la evaluación técnica.

📂 Estructura del Proyecto
mini-proyecto-node/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── app.js
│
├── schema.sql
├── postman_collection.json
├── README.md
└── package.json

⚙️ Requisitos del Sistema

Node.js >= 18

npm / pnpm / yarn

PostgreSQL >= 14

Git

🚀 Instalación y Ejecución
1️⃣ Clonar el repositorio
git clone <repo-url>
cd mini-proyecto-node

2️⃣ Instalar dependencias
npm install

3️⃣ Configurar variables de entorno

Crear archivo .env:

PORT=3000
JWT_SECRET=super_secret_key
DATABASE_URL=postgres://user:password@localhost:5432/vetclinic

🗄️ Base de Datos
📄 Esquema

El archivo schema.sql contiene:

Usuarios (CLIENT, VET, ADMIN)

Mascotas

Veterinarios

Servicios

Citas

Pagos

Bitácora de estados

Incluye:

PK / FK

constraints

validaciones

prevención de doble reserva

Crear BD y aplicar esquema
createdb vetclinic
psql vetclinic < schema.sql

🔐 Autenticación

JWT (access token)

Password hashing con bcrypt

Roles:

CLIENT

VET

ADMIN

📡 Endpoints Implementados
🔑 Auth
Método	Endpoint	Descripción
POST	/auth/register	Registro de cliente
POST	/auth/login	Login y JWT
🐶 Mascotas
Método	Endpoint	Rol
POST	/pets	CLIENT
GET	/pets	CLIENT
🩺 Servicios
Método	Endpoint	Rol
GET	/services	Auth
POST	/services	ADMIN
👨‍⚕️ Veterinarios
Método	Endpoint
GET	/vets?specialty=
GET	/vets/:id/availability?date=YYYY-MM-DD
📅 Citas
Método	Endpoint	Rol
POST	/appointments	CLIENT
PATCH	/appointments/:id/status	CLIENT / VET / ADMIN
GET	/appointments/me	CLIENT
GET	/appointments/vet/me?date=	VET
💳 Pagos
Método	Endpoint
POST	/appointments/:id/pay

Pago simulado

Solo permitido si la cita está COMPLETED

Idempotencia por paymentId

⚠️ Reglas de Negocio

Cliente:

solo gestiona sus mascotas y citas

Veterinario:

solo ve y gestiona sus citas

Admin:

acceso total

No se permite:

doble reserva del mismo veterinario en el mismo horario

Validación estricta de inputs

Manejo consistente de errores HTTP

🔒 Concurrencia y Anti-Overlap (Parte C)
Estrategia utilizada

Validación previa de overlap al crear citas:

newStart < existingEnd && newEnd > existingStart


En PostgreSQL:

uso recomendado de tsrange

EXCLUDE USING GIST para evitar solapamientos (bonus planificado)

Justificación

Garantiza consistencia

Evita race conditions

Fácil de escalar a nivel DB

🧾 Bitácora de Estados

Cada cambio de estado de una cita se registra con:

estado anterior

estado nuevo

usuario

timestamp

Esto permite:

auditoría

historial

reprogramaciones futuras

🧪 Testing
🟠 Testing Manual (actual)

Colección incluida:

postman_collection.json

Flujos probados:

Auth

Mascotas

Servicios

Citas

Estados

Pagos simulados

🟢 Testing Automatizado (planificado)

Unit tests:

validación de overlap

transición de estados

Integration test:

creación y confirmación de cita

📊 Índices y Performance

Índices propuestos:

(vet_id, start_time) → agenda veterinario

(client_id) → citas por cliente

(status, start_time) → reportes

(created_at) → pagos
✍️ Nota Final

Este proyecto fue desarrollado siguiendo buenas prácticas de backend, priorizando:

claridad

consistencia