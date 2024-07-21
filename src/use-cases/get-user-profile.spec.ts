import { describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

describe('Get User Profile Use Case', () => {
  const makeSut = () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new GetUserProfileUseCase(usersRepository)

    return { sut, usersRepository }
  }

  it('should be able to get user profile', async () => {
    const { sut, usersRepository } = makeSut()

    const createdUser = await usersRepository.create({
      email: 'john@doe.com',
      name: 'John Doe',
      password: 'password',
    })

    const result = await sut.execute({ userId: createdUser.id })

    expect(result.user.name).toEqual('John Doe')
  })
})
