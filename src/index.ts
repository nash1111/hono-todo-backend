import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = new Hono()

// -------------
// Todo API
// -------------

// GET /todo
// get all todos
app.get('/todo', async (c) => {
  const todos = await prisma.todo.findMany()
  return c.json(todos)
})

// POST /todo
// create todo
app.post('/todo', async (c) => {
  const body = await c.req.parseBody()
  const { title, userId } = body
  if (!title || !userId) {
    return c.json({ error: 'title and userId are required' }, 400)
  }

  const newTodo = await prisma.todo.create({
    data: {
      title: title as string,
      userId: Number(userId),
    },
  })
  return c.json(newTodo, 201)
})

// -------------
// User API
// -------------

// GET /user
// get all users
app.get('/user', async (c) => {
  const users = await prisma.user.findMany()
  return c.json(users)
})

// POST /user
// create user
app.post('/user', async (c) => {
  const body = await c.req.parseBody()
  const { name, email, password } = body
  if (!name || !email || !password) {
    return c.json({ error: 'name, email, password are required' }, 400)
  }

  const newUser = await prisma.user.create({
    data: {
      name: name as string,
      email: email as string,
      password: password as string,
    },
  })
  return c.json(newUser, 201)
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
