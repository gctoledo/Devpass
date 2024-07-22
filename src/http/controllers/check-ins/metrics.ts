import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export const metrics = async (req: FastifyRequest, reply: FastifyReply) => {
  const getMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getMetricsUseCase.execute({
    userId: req.user.sub,
  })

  return reply.status(201).send({ checkInsCount })
}
