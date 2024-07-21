import { describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

describe('Search Gyms Use Case', () => {
  const makeSut = () => {
    const gymsRepository = new InMemoryGymsRepository()
    const sut = new SearchGymsUseCase(gymsRepository)

    return { sut, gymsRepository }
  }

  it('should be able to search for gyms', async () => {
    const { sut, gymsRepository } = makeSut()

    await gymsRepository.create({
      title: 'Example Gym 1',
      description: null,
      phone: null,
      latitude: -20.5039819,
      longitude: -48.5582783,
    })

    await gymsRepository.create({
      title: 'Example Gym 2',
      description: null,
      phone: null,
      latitude: -20.5039819,
      longitude: -48.5582783,
    })

    const result = await sut.execute({ search: 'Example Gym 1', page: 1 })

    expect(result.gyms).toHaveLength(1)
    expect(result.gyms).toEqual([
      expect.objectContaining({ title: 'Example Gym 1' }),
    ])
  })

  it('should be able fetch paginated gyms search', async () => {
    const { sut, gymsRepository } = makeSut()

    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Example Gym ${i}`,
        description: null,
        phone: null,
        latitude: -20.5039819,
        longitude: -48.5582783,
      })
    }

    const result = await sut.execute({ search: 'Example Gym', page: 2 })

    expect(result.gyms).toHaveLength(2)
    expect(result.gyms).toEqual([
      expect.objectContaining({ title: 'Example Gym 21' }),
      expect.objectContaining({ title: 'Example Gym 22' }),
    ])
  })
})
