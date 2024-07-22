import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export const search = async (req: FastifyRequest, reply: FastifyReply) => {
  const searchGymQuerySchema = z.object({
    search: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { page, search } = searchGymQuerySchema.parse(req.query)

  const searchGymUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymUseCase.execute({
    page,
    search,
  })

  return reply.status(201).send({ gyms })
}
