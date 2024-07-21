import { CheckInRepository } from '@/repositories/interfaces/checkins-repositories'

interface GetUserMetricsUseCaseParams {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseParams): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInRepository.counterByUserId(userId)

    return { checkInsCount }
  }
}
