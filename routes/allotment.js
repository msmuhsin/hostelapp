import allotmentModel from '../models/allotment.js'
import express from 'express'
import studentModel from '../models/student.js'

const router = express.Router()

function allocateStudents(students, seats) {
  students.sort((a, b) => a.score - b.score)
  const allocatedStudents = students.slice(0, seats)
  allocatedStudents.forEach((student) => {
    student.allotted = true
  })
  return allocatedStudents
}

router.get('/', async (req, res) => {
  try {
    const allotment = await allotmentModel.find()
    res.send(allotment)
  } catch (error) {
    res.status(500).send('Error while getting list of allotment from database')
  }
})

router.post('/allocate', async (req, res) => {
  try {
    const students = await studentModel.find().sort({ score: -1 })
    const allotmentValues = req.body.AllotmentValuesForCalculation
    const semesters = ['S1', 'S3', 'S5', 'S7']

    for (const semester of semesters) {
      const semesterSeats = allotmentValues[semester].totalSeats
      const studentsInSemester = students.filter(
        (student) => student.sem === semester && !student.allotted
      )
      const allottedStudents = allocateStudents(
        studentsInSemester,
        semesterSeats
      )
      const allottedStudentIds = allottedStudents.map((student) => student._id)

      // Update 'allotted' status for students
      await studentModel.updateMany(
        { _id: { $in: allottedStudentIds } },
        { allotted: true }
      )

      // Create or update allotment document
      const updateQuery = {
        MH: {
          [semester]: {
            General: allottedStudentIds,
          },
        },
      }
      const updatedAllotment = await allotmentModel.findOneAndUpdate(
        {},
        updateQuery,
        { upsert: true, new: true }
      )
      await updatedAllotment.save()
    }

    res.status(200).send('Students allocated successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error while allocating room')
  }
})
