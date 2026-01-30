# Prueba Técnica – API Veterinaria

## 📌 Descripción General

API REST desarrollada como **prueba técnica**, orientada a la gestión de una clínica veterinaria. Permite administrar usuarios, mascotas (pets), veterinarios (vets) y citas (appointments), aplicando autenticación con JWT y control básico de concurrencia.

El proyecto fue probado manualmente usando **Postman** y **curl**.

---

## 🧱 Stack Tecnológico

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **JWT (JSON Web Tokens)** para autenticación
* **npm** como gestor de dependencias
* **Postman** para pruebas de la API
* **Docker** (opcional – no incluido en esta versión)

---

## 📂 Estructura del Proyecto (resumen)

```text
project-root/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── db/
│   └── app.js
├── package.json
└── README.md
```
🛠️ Instalación y ejecución
📋 Requisitos previos

Node.js v18+

npm / pnpm / yarn

PostgreSQL (opcional)

Git

Verificar versiones:

node -v
npm -v

📥 Clonar el repositorio
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo

📦 Instalar dependencias
npm install

⚙️ Variables de entorno

Crear un archivo .env en la raíz:

PORT=3000
JWT_SECRET=super_secret_key

DB_HOST=localhost
DB_PORT=5432
DB_NAME=veterinary_db
DB_USER=postgres
DB_PASSWORD=postgres


⚠️ Si se usa almacenamiento en memoria (arrays), la base de datos es opcional.

▶️ Ejecutar el proyecto

Modo desarrollo:

npm run dev


Modo producción:

npm start


Servidor disponible en:

http://localhost:3000

---

## 🔐 Autenticación

La API utiliza **JWT**. Para acceder a endpoints protegidos es necesario enviar el token en el header:

```
Authorization: Bearer <TOKEN>
```

El token se obtiene al iniciar sesión.

---

## 📌 Endpoints Principales

### 🔑 Auth

| Método | Endpoint       | Descripción                 |
| ------ | -------------- | --------------------------- |
| POST   | /auth/register | Registro de usuario         |
| POST   | /auth/login    | Login y generación de token |

---

### 🐶 Pets (Mascotas)

| Método | Endpoint | Descripción     |
| ------ | -------- | --------------- |
| POST   | /pets    | Crear mascota   |
| GET    | /pets    | Listar mascotas |

**Body ejemplo:**

```json
{
  "name": "Firulais",
  "species": "Dog",
  "breed": "Labrador",
  "birthDate": "2020-05-10"
}
```

---

### 🧑‍⚕️ Vets (Veterinarios)

| Método | Endpoint           | Descripción                       |
| ------ | ------------------ | --------------------------------- |
| POST   | /vets              | Crear veterinario                 |
| GET    | /vets              | Listar veterinarios               |
| PATCH  | /vets/:id/status   | Actualizar estado del veterinario |
| PATCH  | /vets/:id/schedule | Actualizar agenda                 |

---

### 📅 Appointments (Citas)

| Método | Endpoint      | Descripción  |
| ------ | ------------- | ------------ |
| POST   | /appointments | Crear cita   |
| GET    | /appointments | Listar citas |

---

## 🧪 Testing con Postman

Las pruebas de la API se realizaron **manualmente con Postman**, verificando:

* Correcto funcionamiento de endpoints
* Autenticación JWT
* Creación y lectura de datos
* Control básico de concurrencia (evitar solapamiento de citas)

### ▶️ Cómo probar con Postman

1. Abrir Postman
2. Crear una nueva request
3. Seleccionar el método HTTP (POST, GET, PATCH)
4. Colocar la URL del endpoint
5. En endpoints protegidos:

   * Ir a la pestaña **Headers**
   * Agregar:

     ```
     Key: Authorization
     Value: Bearer <TOKEN>
     ```
6. En requests POST/PATCH:

   * Ir a **Body → raw → JSON**
   * Enviar el body correspondiente

---

## 🧪 Testing con curl (opcional)

Ejemplo de creación de mascota:

```bash
curl -X POST http://localhost:3000/pets \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "name": "Firulais",
  "species": "Dog",
  "breed": "Labrador",
  "birthDate": "2020-05-10"
}'
```

---

## 📋 Requisitos de la Prueba Técnica

✔ Node.js
✔ PostgreSQL
✔ npm
✔ API REST funcional
✔ Testing manual con Postman
✔ Documentación clara

---

## 🚀 Estado del Proyecto

* Endpoints implementados
* Base de datos funcional
* Testing manual completo
* README documentado

Docker se considera una **mejora futura**.

---

## 👨‍💻 Autor

Prueba técnica desarrollada con enfoque en buenas prácticas, claridad y funcionalidad.
