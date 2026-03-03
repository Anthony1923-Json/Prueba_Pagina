<<<<<<< HEAD
# 🏟️ ScoutDB — Gestión de Jugadores

Aplicación web para gestionar jugadores y agencias conectada a tu PostgreSQL local.

---

## 📦 Instalación (una sola vez)

### 1. Instala Node.js
Descárgalo desde https://nodejs.org (versión LTS recomendada)

### 2. Instala las dependencias del proyecto
Abre una terminal en la carpeta `jugadores-app` y ejecuta:
```bash
npm install
```

---

## ⚙️ Configuración

Abre el archivo `server.js` y edita estas 3 líneas con tus datos:

```js
database: 'NOMBRE_DE_TU_BD',   // nombre de tu base de datos PostgreSQL
user:     'postgres',           // tu usuario de PostgreSQL
password: 'TU_PASSWORD',        // tu contraseña
```

---

## 🚀 Arrancar el servidor

```bash
node server.js
```

Verás este mensaje:
```
✅ Servidor corriendo en http://localhost:3000
```

---

## 🌐 Acceder a la aplicación

- **Desde tu PC:** http://localhost:3000
- **Desde otra persona en la misma red:** http://TU_IP_LOCAL:3000
  - Para saber tu IP local: en Windows ejecuta `ipconfig`, en Mac/Linux ejecuta `ifconfig`

---

## 📋 Funcionalidades

| Función            | Descripción                              |
|--------------------|------------------------------------------|
| 📋 Ver jugadores   | Tabla con todos los jugadores registrados |
| 🔍 Buscar          | Filtro por nombre, club o posición        |
| ➕ Añadir jugador  | Formulario completo con todos los campos  |
| ✏️ Editar          | Modal para modificar un jugador           |
| 🗑️ Eliminar        | Borrar un jugador con confirmación        |

---

## 📁 Estructura del proyecto

```
jugadores-app/
├── server.js        ← Backend (API + servidor web)
├── package.json     ← Dependencias
└── public/
    └── index.html   ← Frontend (la página web)
```
=======
# Prueba_Pagina
>>>>>>> 8d2159f6eacd03d73bee9be05d8c6aa8e3d0a9db
