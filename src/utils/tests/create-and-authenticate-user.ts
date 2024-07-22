import { FastifyInstance } from 'fastify'
import { hash } from 'bcryptjs'
import prisma from '@/lib/prisma'
import request from 'supertest'

export const createAndAuthenticateUser = async (
  app: FastifyInstance,
  role: 'ADMIN' | 'MEMBER' = 'MEMBER',
) => {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@doe.com',
      password: await hash('password', 6),
      role,
    },
  })

  const loginResponse = await request(app.server)
    .post('/session')
    .send({ email: 'john@doe.com', password: 'password' })

  const { token } = loginResponse.body

  return { token }
}
