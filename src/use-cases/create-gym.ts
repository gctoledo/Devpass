import { GymsRepository } from '@/repositories/interfaces/gyms-repositories'
import { Gym } from '@prisma/client'

interface CreateGymUseCaseParams {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: CreateGymUseCaseParams): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      latitude,
      longitude,
      title,
      phone,
      description,
    })

    return { gym }
  }
}
