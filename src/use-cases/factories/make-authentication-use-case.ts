import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticationUseCase } from '../authentication'

export const makeAuthenticationUseCase = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new AuthenticationUseCase(prismaUsersRepository)

  return useCase
}
