import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '@/app'

describe('Authentication Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server)
      .post('/users')
      .send({ name: 'John Doe', email: 'john@doe.com', password: 'password' })

    const response = await request(app.server)
      .post('/session')
      .send({ email: 'john@doe.com', password: 'password' })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
