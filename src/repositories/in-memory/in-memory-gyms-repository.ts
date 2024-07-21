import { randomUUID } from 'node:crypto'
import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '@/repositories/interfaces/gyms-repositories'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? String(randomUUID()),
      title: data.title,
      latitude: new Decimal(Number(data.latitude)),
      longitude: new Decimal(Number(data.longitude)),
      description: null,
      phone: null,
    }

    this.gyms.push(gym)

    return gym
  }

  async findById(gymId: string) {
    const gym = this.gyms.find((gym) => gym.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }
}
