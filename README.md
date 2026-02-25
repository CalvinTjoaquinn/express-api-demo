# Express API Demo

REST API built with Node.js, Express, and MongoDB. Includes JWT authentication, full CRUD for tasks, input validation with Zod, and Swagger documentation.

## Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication
- Zod for input validation
- Swagger (OpenAPI 3.0) for docs
- Helmet + CORS for security

## Project Structure

```
src/
  config/       - DB connection, Swagger config
  controllers/  - Route handlers
  middleware/    - Auth, validation, error handling
  models/       - Mongoose schemas
  routes/       - Route definitions + Swagger annotations
  server.js     - App entry point
```

## Setup

```bash
# clone the repo
git clone <repo-url>
cd express-api-demo

# install dependencies
npm install

# set up env vars
cp .env.example .env
# edit .env with your MongoDB URI and JWT secret

# run in dev mode
npm run dev

# run in production
npm start
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login, get JWT token |
| GET | /api/auth/me | Get current user (auth required) |

### Tasks (all require auth)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | List all tasks (supports filtering & sorting) |
| GET | /api/tasks/:id | Get single task |
| POST | /api/tasks | Create task |
| PATCH | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

### Query Parameters (GET /api/tasks)
- `status` - filter by status (pending, in_progress, done)
- `priority` - filter by priority (low, medium, high)
- `sort` - sort by field (prefix with - for descending, e.g. `-createdAt`)

## Swagger Docs

Once the server is running, open [http://localhost:3000/docs](http://localhost:3000/docs) for interactive API documentation.

## Example Usage

```bash
# register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com", "password": "password123"}'

# login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'

# create task (use token from login response)
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{"title": "Buy groceries", "priority": "high"}'

# get all tasks
curl http://localhost:3000/api/tasks \
  -H "Authorization: Bearer <your-token>"
```
