import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ValidateCheckInUseCase } from './validate-checkin'
import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { LateCheckInValidationError } from '@/errors/late-checkin-validation'

describe('Validate CheckIn Use Case', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const makeSut = () => {
    const checkInsRepository = new InMemoryCheckInRepository()
    const sut = new ValidateCheckInUseCase(checkInsRepository)

    return { sut, checkInsRepository }
  }

  it('should be able to validate check-in', async () => {
    const { sut, checkInsRepository } = makeSut()

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-1',
    })

    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.checkIns[0].validated_at).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to validate check-in', async () => {
    const { sut } = makeSut()

    const promise = sut.execute({ checkInId: 'fake-id' })

    await expect(promise).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const { sut, checkInsRepository } = makeSut()

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-1',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    const promise = sut.execute({ checkInId: createdCheckIn.id })

    await expect(promise).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
