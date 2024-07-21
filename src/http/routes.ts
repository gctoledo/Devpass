import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authentication } from './controllers/authentication'

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
  app.post('/session', authentication)
}
