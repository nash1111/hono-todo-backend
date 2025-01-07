import { app } from '../index'
import { prisma } from '../db'

// POST /user
export const userApiRoutes = app.post('/', async (c) => {
  const body = await c.req.json()
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
}).get('/', async (c) => {
  const users = await prisma.user.findMany()
  return c.json(users)
})
