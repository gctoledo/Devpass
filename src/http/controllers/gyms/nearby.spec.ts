import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Search Nearby Gyms Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Nearby Gym',
        description: 'Example description',
        phone: '11999999999',
        latitude: -20.5254765,
        longitude: -48.5522105,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Far Gym',
        description: 'Example description',
        phone: '11999999999',
        latitude: -20.6761314,
        longitude: -48.5191609,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -20.6761314,
        longitude: -48.5191609,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(201)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Far Gym',
      }),
    ])
  })
})
