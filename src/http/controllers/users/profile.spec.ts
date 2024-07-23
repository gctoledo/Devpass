import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Profile Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app)

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

  it('should not be able to get user profile if token is invalid', async () => {
    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer 'invalid-token'`)

    expect(response.statusCode).toEqual(401)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Unauthorized',
      }),
    )
  })
})
