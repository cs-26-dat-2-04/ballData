# ballData — Setup Guide

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)
- [Git](https://git-scm.com/)

---

## 1. Clone & Start

```bash
git clone git@github.com:cs-26-dat-2-04/ballData.git
cd ballData
docker compose up --build
```

Wait until all services are ready:

```
db        | database system is ready to accept connections
backend   | Backend running on http://localhost:3001
frontend  | ▲ Next.js ready on http://localhost:3000
```

---

## 2. Run Migrations

In a separate terminal (while containers are running):

```bash
docker compose exec backend npx prisma migrate dev --name init
```

---

## 3. Seed the Database

```bash
docker compose exec backend npm run seed
```

After seeding, you can log in with:

| Field    | Value                |
| -------- | -------------------- |
| Email    | `coachmail@mail.com` |
| Password | `123passwordhash321` |

---

## 4. Access the Application

| Service     | URL                   |
| ----------- | --------------------- |
| Frontend    | http://localhost:3000 |
| Backend API | http://localhost:3001 |
| Database    | localhost:5432        |

**Production build** is deployed and accessible at:

> **https://balldata.ballebysoftware.dk**

---

## Shut Down

```bash
docker compose down
```

Data is persisted in a Docker volume and will be available on next startup.
