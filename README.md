# Long Polling чат на базе Nest.js

Веб-приложение чат с использованием **long polling** для реального времени.
Реализовано на базе **Nest.js**, **PostgreSQL**, **Prisma**, **GraphQL/REST**

---

## Быстрый старт

### 1. Предварительные требования

- [Git](https://git-scm.com/) ≥ 2.34
- [Docker](https://docs.docker.com/get-docker/) ≥ 20.10
- [Docker Compose](https://docs.docker.com/compose/) ≥ 1.29

### 2. Клонирование репозитория

   ```bash
      git clone https://github.com/Faspeice/chat-backend.git
      cd chat-backend
   ```

### 3. Настройка переменных окружения

1. Переименуйте скопированный файл:

```bash
   mv .env.example .env
   ```

2. Отредактируйте .env при необходимости

### 4. Запуск приложения

   Для локальной разработки и тестирования:

   ```bash
docker-compose build
   ```
   ```bash
docker-compose up -d
   ```

API будет доступен на http://localhost:3000
Swagger документация будет доступна на http://localhost:3000/docs
GraphQL playground будет доступен на http://localhost:3000/graphql

