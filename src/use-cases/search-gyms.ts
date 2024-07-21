import { GymsRepository } from '@/repositories/interfaces/gyms-repositories'
import { Gym } from '@prisma/client'

interface SearchGymsUseCaseParams {
  search: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    search,
    page,
  }: SearchGymsUseCaseParams): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findMany(search, page)

    return { gyms }
  }
}
