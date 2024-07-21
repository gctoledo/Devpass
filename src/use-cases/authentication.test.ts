import { describe, it, expect } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authentication'
import { hash } from 'bcryptjs'

describe('Authentication Use Case', () => {
  const makeSut = () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    return { sut, usersRepository }
  }

  it('should be able to authenticate', async () => {
    const { sut, usersRepository } = makeSut()

    await usersRepository.create({
      email: 'john@doe.com',
      name: 'John Doe',
      password: await hash('password', 6),
    })

    const result = await sut.execute({
      email: 'john@doe.com',
      password: 'password',
    })

    expect(result.user.email).toEqual('john@doe.com')
  })
})
