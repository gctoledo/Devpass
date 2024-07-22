import { FastifyInstance } from 'fastify'
import request from 'supertest'

export const createAndAuthenticateUser = async (app: FastifyInstance) => {
  await request(app.server)
    .post('/users')
    .send({ name: 'John Doe', email: 'john@doe.com', password: 'password' })

  const loginResponse = await request(app.server)
    .post('/session')
    .send({ email: 'john@doe.com', password: 'password' })

  const { token } = loginResponse.body

  return { token }
}
