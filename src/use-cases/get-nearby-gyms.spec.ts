import { describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { GetNearbyGymsUseCase } from './get-nearby-gyms'

describe('Get Nearby Gyms Use Case', () => {
  const makeSut = () => {
    const gymsRepository = new InMemoryGymsRepository()
    const sut = new GetNearbyGymsUseCase(gymsRepository)

    return { sut, gymsRepository }
  }

  it('should be able to get nearby gyms', async () => {
    const { sut, gymsRepository } = makeSut()

    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -20.5254765,
      longitude: -48.5522105,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -20.6761314,
      longitude: -48.5191609,
    })

    const result = await sut.execute({
      userLatitude: -20.5201913,
      userLongitude: -48.5612871,
    })

    expect(result.gyms).toHaveLength(1)
    expect(result.gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym' }),
    ])
  })
})
