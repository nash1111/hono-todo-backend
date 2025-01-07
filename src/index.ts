import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { userApiRoutes } from './routes/user'
import { todoApiRoutes } from './routes/todo'

export const app = new Hono()

app.route('/user', userApiRoutes)

app.route('/todo', todoApiRoutes)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})

export type TodoApiRoutes = typeof todoApiRoutes
export type UserApiRoutes = typeof userApiRoutes