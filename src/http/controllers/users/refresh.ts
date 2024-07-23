import { FastifyReply, FastifyRequest } from 'fastify'

export const refresh = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    await req.jwtVerify({ onlyCookie: true })

    const { role } = req.user

    const token = await reply.jwtSign(
      { role },
      {
        sign: {
          sub: req.user.sub,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      { role },
      {
        sign: {
          sub: req.user.sub,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true, // https
        sameSite: true, // only same site can access
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
