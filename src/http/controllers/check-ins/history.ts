import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-get-user-check-ins-history-use-case'

export const history = async (req: FastifyRequest, reply: FastifyReply) => {
  const historyCheckInsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyCheckInsQuerySchema.parse(req.query)

  const getCheckInsHistory = makeGetUserCheckInsHistoryUseCase()

  const { checkIns } = await getCheckInsHistory.execute({
    page,
    userId: req.user.sub,
  })

  return reply.status(201).send({ checkIns })
}
