import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { EmailAlreadyExistsError } from '@/errors/email-already-exists'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const createUserBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(7),
  })

  const { email, name, password } = createUserBodySchema.parse(req.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ email, name, password })
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
