import { UsersRepository } from '@/repositories/interfaces/users-repositories'
import { User, Prisma } from '@prisma/client'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findById(userId: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === userId)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }
}
