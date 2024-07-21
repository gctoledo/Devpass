import { expect, describe, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

describe('Create Gym Use Case', () => {
  const makeSut = () => {
    const gymRepository = new InMemoryGymsRepository()
    const sut = new CreateGymUseCase(gymRepository)

    return { gymRepository, sut }
  }

  it('should be able to register a new gym', async () => {
    const { sut } = makeSut()

    const { gym } = await sut.execute({
      title: 'Example Gym',
      description: null,
      phone: null,
      latitude: -20.5039819,
      longitude: -48.5582783,
    })

    expect(gym.title).toEqual('Example Gym')
  })
})
