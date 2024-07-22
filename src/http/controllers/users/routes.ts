import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authentication } from './authentication'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'

export const usersRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
  app.post('/session', authentication)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
