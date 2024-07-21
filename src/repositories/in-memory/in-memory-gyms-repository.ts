import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/interfaces/gyms-repositories'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(gymId: string) {
    const gym = this.gyms.find((gym) => gym.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }
}
