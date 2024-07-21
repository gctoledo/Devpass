import { describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

describe('Get User Metrics History', () => {
  const makeSut = () => {
    const checkInsRepository = new InMemoryCheckInRepository()
    const sut = new GetUserMetricsUseCase(checkInsRepository)

    return { sut, checkInsRepository }
  }

  it('should be able to get user check-ins count from metrics', async () => {
    const { sut, checkInsRepository } = makeSut()

    await checkInsRepository.create({ gym_id: 'gym-01', user_id: 'user-01' })
    await checkInsRepository.create({ gym_id: 'gym-02', user_id: 'user-01' })

    const result = await sut.execute({ userId: 'user-01' })

    expect(result.checkInsCount).toEqual(2)
  })
})
