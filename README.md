# ballData Project Setup for Local Development 😎

Sådan får i projektet til at køre

---

## Forudsætninger

Følgende skal være installeret før i begynder:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (inklusiv Docker Compose)
- [Git](https://git-scm.com/)

---

## 1. Clone repository

```bash
git clone git@github.com:cs-26-dat-2-04/ballData.git
cd ballData
```

---

## 2. Config filer (De burde være sådan i forvejen)

### `docker-compose.yml`

```yaml
services:
  db:
    image: postgres:16
    restart: always
    environment:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: myapp
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    restart: always
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://dev:dev@db:5432/myapp
      PORT: 3001
    volumes:
      - ./backend:/app
      - /app/node_modules
    ports:
      - "3001:3001"

  frontend:
    build: ./frontend
    restart: always
    depends_on:
      - backend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "3000:3000"

volumes:
  pgdata:
```

### `backend/Dockerfile`

> **Note:** `node:20-alpine` inkluderer ikke OpenSSL, som Prisma V5 skal bruge. Hvis du får en error fordi du mangler det, skal du installere det ved siden af.

```dockerfile
FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate
EXPOSE 3001
CMD ["npm", "run", "dev"]
```

### `frontend/Dockerfile`

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

### `backend/package.json`

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "migrate": "prisma migrate dev",
    "migrate:deploy": "prisma migrate deploy",
    "generate": "prisma generate",
    "seed": "node prisma/seed.js"
  },
  "dependencies": {
    "@prisma/client": "5.22.0",
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "prisma": "5.22.0",
    "nodemon": "^3.0.0"
  }
}
```

### `backend/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

### `backend/src/lib/prisma.js`

```js
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### `backend/src/routes/users.js`

```js
import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post("/", async (req, res) => {
  const { email, name } = req.body;
  const user = await prisma.user.create({ data: { email, name } });
  res.status(201).json(user);
});

export default router;
```

### `backend/src/index.js`

```js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/users", userRoutes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
```

---

## 3. Start alle services

```bash
docker compose up --build
```

Vent til alle er klar:

```
db        | database system is ready to accept connections
backend   | Backend running on http://localhost:3001
frontend  | ▲ Next.js ready on http://localhost:3000
```

Så er de tilgængelige ved:

| Service       | URL                   |
| ------------- | --------------------- |
| Frontend      | http://localhost:3000 |
| Backend       | http://localhost:3001 |
| Prisma Studio | http://localhost:5555 |
| Database      | localhost:5432        |

> **Note:** Brug `docker compose up` uden `--build`. Kun brug med `--build` hvis du ændrer en Dockerfile eller tilføjer dependencies.

---

## 4. Kør Database Migrations

I en seperat terminal (når containerne er oppe at køre), kør:

```bash
docker compose exec backend npx prisma migrate dev --name init
```

Den burde sige:

```
✔ Generated Prisma Client
✔ Applied migration `20240101000000_init`
```

---

## 5. Tjek at det kører

**Health check:**

```bash
curl http://localhost:3001/health
# → { "status": "ok" }
```

**Opret en test bruger:**

```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "name": "Test User"}'
```

**Fetch brugere:**

```bash
curl http://localhost:3001/users
# → [{ "id": 1, "email": "test@example.com", ... }]
```

---

## Tips og Tricks

### Sluk og stop for i dag

```bash
docker compose down
```

Data bliver gemt i din Docker volume og er der når du kommer tilbage.

### Fuld reset

```bash
docker compose down -v
docker compose up --build
docker compose exec backend npx prisma migrate dev --name init
```

### Efter installering af nye NPM packages

Rebuild når der er tilføjet til `package.json`:

```bash
docker compose up --build
```

---

## Prisma Migration Schema Ændringer

> **KUN EN PERSON ÆNDRER SCHEMA ÆNDRINGER AD GANGEN!!** (for at undgå conflicts). ellers skylder man øl eller kage til hele gruppen :)

### Personen der ændrer:

1. Rediger `backend/prisma/schema.prisma`.
2. Kør migration:
   ```bash
   docker compose exec backend npx prisma migrate dev --name beskriv_ændring_her
   ```
3. Commit dine ændringer til git.

### Alle andre (efter git pull)

```bash
git pull
docker compose exec backend npx prisma migrate deploy
```

---
