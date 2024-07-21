import { describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

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

  it('should not be able to get user profile with wrong id', async () => {
    const { sut, usersRepository } = makeSut()

    await usersRepository.create({
      email: 'john@doe.com',
      name: 'John Doe',
      password: 'password',
    })

    const promise = sut.execute({ userId: 'wrong_id' })

    expect(promise).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
