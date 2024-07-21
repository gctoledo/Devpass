import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/interfaces/checkins-repositories'

interface GetUserCheckInsHistoryUseCaseParams {
  userId: string
  page: number
}

interface GetUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class GetUserCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: GetUserCheckInsHistoryUseCaseParams): Promise<GetUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}
