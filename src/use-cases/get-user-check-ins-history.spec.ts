import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { describe, expect, it } from 'vitest'
import { GetUserCheckInsHistoryUseCase } from './get-user-check-ins-history'

describe('Get User Check-ins History', () => {
  const makeSut = () => {
    const checkInsRepository = new InMemoryCheckInRepository()
    const sut = new GetUserCheckInsHistoryUseCase(checkInsRepository)

    return { sut, checkInsRepository }
  }

  it('should be able fetch check-in history', async () => {
    const { sut, checkInsRepository } = makeSut()

    await checkInsRepository.create({ gym_id: 'gym-01', user_id: 'user-01' })
    await checkInsRepository.create({ gym_id: 'gym-02', user_id: 'user-01' })

    const result = await sut.execute({ userId: 'user-01', page: 1 })

    expect(result.checkIns).toHaveLength(2)
    expect(result.checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })
})
