import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authentication } from './authentication'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { refresh } from './refresh'

export const usersRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
  app.post('/session', authentication)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
