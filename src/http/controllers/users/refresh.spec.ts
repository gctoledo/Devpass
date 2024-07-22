import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '@/app'

describe('Refresh Token Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh jwt', async () => {
    await request(app.server)
      .post('/users')
      .send({ name: 'John Doe', email: 'john@doe.com', password: 'password' })

    const authResponse = await request(app.server)
      .post('/session')
      .send({ email: 'john@doe.com', password: 'password' })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies ?? [])

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
