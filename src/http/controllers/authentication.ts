import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticationUseCase } from '@/use-cases/authentication'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { InvalidCredentialsError } from '@/errors/invalid-credentials'

export const authentication = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const authenticationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(7),
  })

  const { email, password } = authenticationBodySchema.parse(req.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticationUseCase = new AuthenticationUseCase(
      prismaUsersRepository,
    )

    await authenticationUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
