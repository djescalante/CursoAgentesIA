# 💡 Ejemplo Completo: Stack MERN

Este es un ejemplo de un `compose.yaml` completo para desplegar una aplicación MERN (MongoDB, Express, React, Node.js).

```yaml
services:
  # -------------------------
  # Frontend (React/Vite)
  # -------------------------
  frontend:
    build: 
      context: ./frontend
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://localhost:3000
    depends_on:
      - backend

  # -------------------------
  # Backend (Node/Express)
  # -------------------------
  backend:
    build: 
      context: ./backend
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=mongodb://root:example@mongo:27017/merndb?authSource=admin
      - PORT=3000
    depends_on:
      mongo:
        condition: service_healthy

  # -------------------------
  # Base de Datos (MongoDB)
  # -------------------------
  mongo:
    image: mongo:6.0
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=example
      - MONGO_INITDB_DATABASE=merndb
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017" # Quitar en prod
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 10s
      retries: 5

volumes:
  mongo_data:
```
