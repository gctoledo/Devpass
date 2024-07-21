import { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>
  findMany(search: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
