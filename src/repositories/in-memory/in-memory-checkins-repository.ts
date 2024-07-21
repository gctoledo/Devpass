import { randomUUID } from 'node:crypto'
import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../interfaces/checkins-repositories'

export class InMemoryCheckInRepository implements CheckInRepository {
  public checkIns: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.checkIns.push(checkIn)

    return checkIn
  }
}
