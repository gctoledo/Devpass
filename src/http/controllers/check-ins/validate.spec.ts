import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import prisma from '@/lib/prisma'

describe('Validate Check-In Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Example Gym',
        description: 'Example description',
        phone: '11999999999',
        latitude: -20.5039819,
        longitude: -48.5582783,
      },
    })

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(response.statusCode).toEqual(204)
    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
