import { prisma } from '../db'
import { Hono } from 'hono'

const app = new Hono()


// GET /todo
export const todoApiRoutes = app.get('/todo', async (c) => {
  const todos = await prisma.todo.findMany()
  return c.json(todos)
}).post('/todo', async (c) => {
  const body = await c.req.json()
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
