import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeNearbyGymsUseCase } from '@/use-cases/factories/make-get-nearby-gyms-use-case'

export const nearby = async (req: FastifyRequest, reply: FastifyReply) => {
  const nearbyQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyQuerySchema.parse(req.query)

  const nearbyGymsUseCase = makeNearbyGymsUseCase()

  const { gyms } = await nearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({ gyms })
}
