import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/interfaces/checkins-repositories'

interface CheckInUseCaseParams {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseParams): Promise<CheckInUseCaseResponse> {
    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error('Error')
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
