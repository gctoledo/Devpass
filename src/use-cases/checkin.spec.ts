import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { describe, expect, it } from 'vitest'
import { CheckInUseCase } from './checkin'
import { randomUUID } from 'crypto'

describe('Check In Use Case', () => {
  const makeSut = () => {
    const checkInsRepository = new InMemoryCheckInRepository()
    const sut = new CheckInUseCase(checkInsRepository)

    return { sut, checkInsRepository }
  }

  it('should be able to check in', async () => {
    const { sut } = makeSut()

    const params = {
      gymId: randomUUID(),
      userId: randomUUID(),
    }

    const result = await sut.execute(params)

    expect(result.checkIn.gym_id).toEqual(params.gymId)
  })
})
