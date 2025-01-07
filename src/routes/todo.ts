import { app } from '../index'
import { prisma } from '../db'

// GET /todo
export const todoApiRoutes = app.get('/', async (c) => {
  const todos = await prisma.todo.findMany()
  return c.json(todos)
}).post('/', async (c) => {
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
