import { GymsRepository } from '@/repositories/interfaces/gyms-repositories'
import { Gym } from '@prisma/client'

interface GetNearbyGymsUseCaseParams {
  userLatitude: number
  userLongitude: number
}

interface GetNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class GetNearbyGymsUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: GetNearbyGymsUseCaseParams): Promise<GetNearbyGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
