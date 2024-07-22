import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Create Gym Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create gym', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Example Gym',
        description: 'Example description',
        phone: '11999999999',
        latitude: -20.5039819,
        longitude: -48.5582783,
      })

    expect(response.statusCode).toEqual(201)
  })
})
