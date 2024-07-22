import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../checkin'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'

export const makeGetUserProfileUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
