import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/errors/invalid-credentials'
import { makeAuthenticationUseCase } from '@/use-cases/factories/make-authentication-use-case'

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
    const authenticationUseCase = makeAuthenticationUseCase()

    const { user } = await authenticationUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
