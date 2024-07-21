import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './checkin'
import { randomUUID } from 'crypto'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

describe('Check In Use Case', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const makeSut = () => {
    const checkInsRepository = new InMemoryCheckInRepository()
    const gymsRepository = new InMemoryGymsRepository()
    const sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    return { sut, checkInsRepository, gymsRepository }
  }

  const createCheckInParams = {
    gymId: randomUUID(),
    userId: randomUUID(),
    userLatitude: 0,
    userLongitude: 0,
  }

  const createGymParams = {
    id: createCheckInParams.gymId,
    latitude: 0,
    longitude: 0,
    title: 'Example Gym',
  }

  it('should be able to check in', async () => {
    const { sut, gymsRepository } = makeSut()

    await gymsRepository.create(createGymParams)

    const result = await sut.execute(createCheckInParams)

    expect(result.checkIn.gym_id).toEqual(createCheckInParams.gymId)
  })

  it('should not be able to check in twice in the same day', async () => {
    const { sut, gymsRepository } = makeSut()

    vi.setSystemTime(new Date(2022, 1, 20, 7, 0, 0))

    await gymsRepository.create(createGymParams)

    await sut.execute(createCheckInParams)

    const promise = sut.execute(createCheckInParams)

    await expect(promise).rejects.toThrow()
  })

  it('should be able to check in different days', async () => {
    const { sut, gymsRepository } = makeSut()

    await gymsRepository.create(createGymParams)

    console.log(await gymsRepository.findById(createCheckInParams.gymId))

    vi.setSystemTime(new Date(2022, 1, 20, 7, 0, 0))

    await sut.execute(createCheckInParams)

    vi.setSystemTime(new Date(2022, 1, 21, 7, 0, 0))

    const checkIn = await sut.execute(createCheckInParams)

    expect(checkIn.checkIn.gym_id).toEqual(createCheckInParams.gymId)
  })

  it('should not be able to check in on distant gym', async () => {
    const { sut, gymsRepository } = makeSut()

    await gymsRepository.create({
      ...createGymParams,
      latitude: -20.5684736,
      longitude: -48.5720064,
    })

    const promise = sut.execute({
      ...createCheckInParams,
      userLatitude: -20.5039819,
      userLongitude: -48.5582783,
    })

    await expect(promise).rejects.toThrow()
  })
})
