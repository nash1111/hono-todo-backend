import { Hono } from 'hono'
import { prisma } from '../db.ts'

export const todoApiRoutes = new Hono()

// GET /todo
todoApiRoutes.get('/', async (c) => {
  const todos = await prisma.todo.findMany()
  return c.json(todos)
})

// POST /todo
todoApiRoutes.post('/', async (c) => {
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
