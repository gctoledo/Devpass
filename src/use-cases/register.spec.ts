import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { EmailAlreadyExistsError } from '@/errors/email-already-exists'

describe('Register Use Case', () => {
  const makeSut = () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new RegisterUseCase(usersRepository)

    return { usersRepository, sut }
  }

  it('should be able to register a new user', async () => {
    const { sut } = makeSut()

    const { user } = await sut.execute({
      email: 'john@doe',
      name: 'John Doe',
      password: 'password',
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should hash user password before creating it', async () => {
    const { sut } = makeSut()

    const { user } = await sut.execute({
      email: 'john@doe',
      name: 'John Doe',
      password: 'password',
    })

    const passwordHasBeenHashed = await compare('password', user.password)

    expect(passwordHasBeenHashed).toBe(true)
  })

  it('should not be able to register with email that already exists', async () => {
    const { sut, usersRepository } = makeSut()

    const email = 'john@doe.com'

    await usersRepository.create({
      name: 'John Doe',
      email,
      password: 'password',
    })

    const promise = sut.execute({
      name: 'John Doe',
      email,
      password: 'password',
    })

    await expect(promise).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
