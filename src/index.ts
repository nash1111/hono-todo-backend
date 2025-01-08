import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { userApiRoutes } from './routes/user'
import { todoApiRoutes } from './routes/todo'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3333
console.log(`Server is running on http://localhost:${port}`)

app.route('/',userApiRoutes)
app.route('/', todoApiRoutes)

serve({
  fetch: app.fetch,
  port,
})

export type TodoApiRoutes = typeof todoApiRoutes
export type UserApiRoutes = typeof userApiRoutes