import express from 'express'
import allotmentSetModel from '../models/allotmentset.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const latestAllotmentSet = await allotmentSetModel
      .findOne()
      .sort({ createdAt: -1 })

    if (!latestAllotmentSet) {
      return res.send({
        message: 'allotmentset not found',
        success: false,
      })
    }

    res.send({
      latestAllotmentSet,
      message: 'allotmentset set found',
      success: true,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
