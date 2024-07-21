import { EmailAlreadyExistsError } from '@/errors/email-already-exists'
import { UsersRepository } from '@/interfaces/repositores'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseParams {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseParams): Promise<RegisterUseCaseResponse> {
    const emailAlreadyExists = await this.userRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.userRepository.create({
      email,
      name,
      password: password_hash,
    })

    return { user }
  }
}
