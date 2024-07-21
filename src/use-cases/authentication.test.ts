import { describe, it, expect } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authentication'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '@/errors/invalid-credentials'

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

  it('should not be able to authenticate if email does not exist', async () => {
    const { sut } = makeSut()

    const promise = sut.execute({ email: 'john@doe.com', password: 'password' })

    expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate if password is wrong', async () => {
    const { sut, usersRepository } = makeSut()

    await usersRepository.create({
      email: 'john@doe.com',
      name: 'John Doe',
      password: await hash('password', 6),
    })

    const promise = sut.execute({
      email: 'john@doe.com',
      password: 'wrong_password',
    })

    expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
