import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '@/app'

describe('Profile Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server)
      .post('/users')
      .send({ name: 'John Doe', email: 'john@doe.com', password: 'password' })

    const loginResponse = await request(app.server)
      .post('/session')
      .send({ email: 'john@doe.com', password: 'password' })

    const { token } = loginResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        email: 'john@doe.com',
      }),
    )
  })
})
