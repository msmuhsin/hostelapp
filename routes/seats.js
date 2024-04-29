import express from 'express'
import seatsModel from '../models/seats.js'

const router = express.Router()

router.get('/id', async (req, res) => {
  try {
    if (!req.params.id) {
      res
        .status(400)
        .json({ success: false, message: 'Allotment id not provided' })
    }

    const seat = await seatsModel.find({ allotmentId: req.params.id })

    if (!seat) {
      res.status(404).json({ success: false, message: 'Seat not found' })
    } else {
      res.status(200).json({ success: true, seat })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router