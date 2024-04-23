import express from 'express'
import jwt, { decode } from 'jsonwebtoken'
import userModel from '../models/user.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'All fields are required', success: false })
  }

  const isExistingUser = await userModel.findOne({ email })

  if (isExistingUser) {
    return res.status(400).json({
      message: 'User already exists cannot register again',
      success: false,
    })
  }

  const user = new userModel({ email, password })
  await user.save()

  res
    .status(201)
    .json({ message: 'User registered successfully', success: true })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'All fields are required', success: false })
  }

  const user = await userModel.findOne({ email }).select('+password')

  if (!user) {
    return res.status(404).json({ message: 'User not found', success: false })
  }

  if (user.password !== password) {
    return res
      .status(401)
      .json({ message: 'Invalid credentials', success: false })
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '10d',
  })

  res.status(200).json({ message: 'User logged in', success: true, token })
})

router.get('/profile', async (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized', success: false })
  }

  const token = authHeader.split(' ')[1] // Extract token from authorization header

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findOne({ email: decoded.email })

    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false })
    }

    res.status(200).json({ message: 'User profile', success: true, user })
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', success: false })
  }
})

export default router
