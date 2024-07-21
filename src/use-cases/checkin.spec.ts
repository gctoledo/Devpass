import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './checkin'
import { randomUUID } from 'crypto'

describe('Check In Use Case', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

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

  it('should not be able to check in twice in the same day', async () => {
    const { sut } = makeSut()

    vi.setSystemTime(new Date(2022, 1, 20, 7, 0, 0))

    const params = {
      gymId: randomUUID(),
      userId: randomUUID(),
    }

    await sut.execute(params)

    const promise = sut.execute(params)

    await expect(promise).rejects.toThrow()
  })

  it('should be able to check in different days', async () => {
    const { sut } = makeSut()

    const params = {
      gymId: randomUUID(),
      userId: randomUUID(),
    }

    vi.setSystemTime(new Date(2022, 1, 20, 7, 0, 0))

    await sut.execute(params)

    vi.setSystemTime(new Date(2022, 1, 21, 7, 0, 0))

    const checkIn = await sut.execute(params)

    expect(checkIn.checkIn.gym_id).toEqual(params.gymId)
  })
})
