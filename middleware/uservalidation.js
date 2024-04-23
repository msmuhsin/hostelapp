import jwt from 'jsonwebtoken'

export const userValidate = async (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).send({ message: 'Access Denied', success: false })
  }

  const tokenRegex = /^Bearer (.+)$/

  const tokenMatch = token.match(tokenRegex)

  if (!tokenMatch) {
    return res.status(401).send({ message: 'Invalid Token', success: false })
  }

  try {
    const verified = await jwt.verify(tokenMatch[1], process.env.JWT_SECRET)

    req.user = verified

    next()
  } catch (err) {
    console.log('Error verifying token', err)
    res.status(400).send({ message: 'Invalid Token', success: false })
  }
}
