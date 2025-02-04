import { User } from '@prisma/client'
import { InvalidCredentialsError } from '@/errors/invalid-credentials'
import { UsersRepository } from '@/repositories/interfaces/users-repositories'
import { compare } from 'bcryptjs'

interface AuthenticationUseCaseParams {
  email: string
  password: string
}

interface AuthenticationUseCaseResponse {
  user: User
}

export class AuthenticationUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticationUseCaseParams): Promise<AuthenticationUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
