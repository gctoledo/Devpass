import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export const profile = async (req: FastifyRequest, reply: FastifyReply) => {
  const getUserProfile = makeGetUserProfileUseCase()

  try {
    const { user } = await getUserProfile.execute({ userId: req.user.sub })

    return reply.status(200).send({ ...user, password: undefined })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
