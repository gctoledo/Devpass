import { UsersRepository } from '@/interfaces/repositores'
import { hash } from 'bcryptjs'

interface RegisterUseCaseParams {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ email, name, password }: RegisterUseCaseParams) {
    const emailAlreadyExists = await this.userRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new Error('Email already exists')
    }

    const password_hash = await hash(password, 6)

    await this.userRepository.create({
      email,
      name,
      password: password_hash,
    })
  }
}
