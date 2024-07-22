import { GetNearbyGymsUseCase } from '../get-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export const makeNearbyGymsUseCase = () => {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new GetNearbyGymsUseCase(gymsRepository)

  return useCase
}
