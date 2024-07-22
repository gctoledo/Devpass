import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Search Gym Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'First Example Gym',
        description: 'Example description',
        phone: '11999999999',
        latitude: -20.5039819,
        longitude: -48.5582783,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Second Example Gym',
        description: 'Example description',
        phone: '11999999999',
        latitude: -20.5039819,
        longitude: -48.5582783,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        search: 'Second',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(201)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Second Example Gym',
      }),
    ])
  })
})
