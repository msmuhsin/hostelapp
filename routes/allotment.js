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
    const { vacancyAvailable, SC_ST_PH_BPL, S1, S3, S5, S7, PG } =
      allotmentValues

    const total_SC_ST_PH_BPL_seats = SC_ST_PH_BPL.totalSeats

    //Divided into 5 parts S1, S3, S5, S7, PG
    const total_no_SC_ST_PH_BPL_of_S1 = Math.round(total_SC_ST_PH_BPL_seats / 5)
    const total_no_SC_ST_PH_BPL_of_S3 = Math.round(total_SC_ST_PH_BPL_seats / 5)
    const total_no_SC_ST_PH_BPL_of_S5 = Math.round(total_SC_ST_PH_BPL_seats / 5)
    const total_no_SC_ST_PH_BPL_of_PG = Math.round(total_SC_ST_PH_BPL_seats / 5)
    const total_no_SC_ST_PH_BPL_of_S7 =
      total_SC_ST_PH_BPL_seats -
      (total_no_SC_ST_PH_BPL_of_S1 +
        total_no_SC_ST_PH_BPL_of_S3 +
        total_no_SC_ST_PH_BPL_of_S5 +
        total_no_SC_ST_PH_BPL_of_PG)

    //S1
    const S1Seats = S1.totalSeats
    const SC_Seats_S1 = Math.round(total_no_SC_ST_PH_BPL_of_S1 / 4)
    const PH_Seats_S1 = Math.round(total_no_SC_ST_PH_BPL_of_S1 / 4)
    const ST_Seats_S1 = Math.round(total_no_SC_ST_PH_BPL_of_S1 / 4)
    const BPL_Seats_S1 =
      total_no_SC_ST_PH_BPL_of_S1 - (ST_Seats_S1 + PH_Seats_S1 + SC_Seats_S1)

    //S3
    const S3Seats = S3.totalSeats
    const SC_Seats_S3 = Math.round(total_no_SC_ST_PH_BPL_of_S3 / 4)
    const PH_Seats_S3 = Math.round(total_no_SC_ST_PH_BPL_of_S3 / 4)
    const ST_Seats_S3 = Math.round(total_no_SC_ST_PH_BPL_of_S3 / 4)
    const BPL_Seats_S3 =
      total_no_SC_ST_PH_BPL_of_S3 - (ST_Seats_S3 + PH_Seats_S3 + SC_Seats_S3)

    //S5
    const S5Seats = S5.totalSeats
    const SC_Seats_S5 = Math.round(total_no_SC_ST_PH_BPL_of_S5 / 4)
    const PH_Seats_S5 = Math.round(total_no_SC_ST_PH_BPL_of_S5 / 4)
    const ST_Seats_S5 = Math.round(total_no_SC_ST_PH_BPL_of_S5 / 4)
    const BPL_Seats_S5 =
      total_no_SC_ST_PH_BPL_of_S5 - (ST_Seats_S5 + PH_Seats_S5 + SC_Seats_S5)

    //S7
    const S7Seats = S7.totalSeats
    const SC_Seats_S7 = Math.round(total_no_SC_ST_PH_BPL_of_S7 / 4)
    const PH_Seats_S7 = Math.round(total_no_SC_ST_PH_BPL_of_S7 / 4)
    const ST_Seats_S7 = Math.round(total_no_SC_ST_PH_BPL_of_S7 / 4)
    const BPL_Seats_S7 =
      total_no_SC_ST_PH_BPL_of_S7 - (ST_Seats_S7 + PH_Seats_S7 + SC_Seats_S7)

    //PG
    const PGSeats = PG.totalSeats
    const total_no_of_SC_Seats_in_PG = Math.round(
      total_no_SC_ST_PH_BPL_of_PG / 4
    )
    const total_no_of_PH_Seats_in_PG = Math.round(
      total_no_SC_ST_PH_BPL_of_PG / 4
    )
    const total_no_of_ST_Seats_in_PG = Math.round(
      total_no_SC_ST_PH_BPL_of_PG / 4
    )
    const total_no_of_BPL_Seats_in_PG =
      total_no_SC_ST_PH_BPL_of_PG - (ST_Seats_PG + PH_Seats_PG + SC_Seats_PG)

    //M1 , M3, S9 :SC
    const SC_Seats_M1 = Math.round(total_no_of_SC_Seats_PG / 3)
    const SC_Seats_M3 = Math.round(total_no_of_ST_Seats_PG / 3)
    const SC_Seats_S9 = total_no_of_SC_Seats_in_PG - (SC_Seats_M1 + SC_Seats_M3)

    //M1, M3, S9 :ST

    const ST_Seats_M1 = Math.round(total_no_of_ST_Seats_in_PG / 3)
    const ST_Seats_M3 = Math.round(total_no_of_ST_Seats_in_PG / 3)
    const ST_Seats_S9 = total_no_of_ST_Seats_in_PG - (ST_Seats_M1 + ST_Seats_M3)

    //M1, M3, S9 :PH
    const PH_Seats_M1 = Math.round(total_no_of_PH_Seats_PG / 3)
    const PH_Seats_M3 = Math.round(total_no_of_PH_Seats_PG / 3)
    const PH_Seats_S9 = total_no_of_PH_Seats_in_PG - (PH_Seats_M1 + PH_Seats_M3)

    //M1, M3, S9 :BPL
    const BPL_Seats_M1 = Math.round(total_no_of_BPL_Seats_in_PG / 3)
    const BPL_Seats_M3 = Math.round(total_no_of_BPL_Seats_in_PG / 3)
    const BPL_Seats_S9 =
      total_no_of_BPL_Seats_in_PG - (BPL_Seats_M1 + BPL_Seats_M3)

    //? Allocation Of Seats

    const S1_Students = students.filter(
      (student) => student.sem === 'S1' && student.allotted === false
    )
    const S3_Students = students.filter(
      (student) => student.sem === 'S3' && student.allotted === false
    )
    const S5_Students = students.filter(
      (student) => student.sem === 'S5' && student.allotted === false
    )
    const S7_Students = students.filter(
      (student) => student.sem === 'S7' && student.allotted === false
    )

    const allotted_S1_Students = allocateStudents(S1_Students, S1Seats)
    const allotted_S3_Students = allocateStudents(S3_Students, S3Seats)
    const allotted_S5_Students = allocateStudents(S5_Students, S5Seats)
    const allotted_S7_Students = allocateStudents(S7_Students, S7Seats)

    // Get all id of allocated students
    const allotted_S1_StudentsIds = allotted_S1_Students.map(
      (student) => student._id
    )
    await studentModel.updateMany(
      { _id: { $in: allotted_S1_StudentsIds } },
      { allotted: true }
    )
    // update in the MH.S1.General
    const updatedS1Allotment = await allotmentModel.create({
      MH: {
        S1: {
          General: allotted_S1_StudentsIds,
        },
      },
    })

    updatedS1Allotment.save()

    const allotted_S3_StudentsIds = allotted_S3_Students.map(
      (student) => student._id
    )
    await studentModel.updateMany(
      { _id: { $in: allotted_S3_StudentsIds } },
      { allotted: true }
    )

    const updatedS3Allotment = await allotmentModel.create({
      MH: {
        S3: {
          General: allotted_S3_StudentsIds,
        },
      },
    })

    await updatedS3Allotment.save()

    const allotted_S5_StudentsIds = allotted_S5_Students.map(
      (student) => student._id
    )

    await studentModel.updateMany(
      { _id: { $in: allotted_S5_StudentsIds } },
      { allotted: true }
    )

    const updatedS5Allotment = await allotmentModel.create({
      MH: {
        S5: {
          General: allotted_S5_StudentsIds,
        },
      },
    })

    await updatedS5Allotment.save()

    const allotted_S7_StudentsIds = allotted_S7_Students.map(
      (student) => student._id
    )

    await studentModel.updateMany(
      { _id: { $in: allotted_S7_StudentsIds } },
      { allotted: true }
    )

    const updatedS7Allotment = await allotmentModel.create({
      MH: {
        S7: {
          General: allotted_S7_StudentsIds,
        },
      },
    })

    await updatedS7Allotment.save()
  } catch (error) {
    console.error(error)
    res.status(500).send('Error while allocating room')
  }
})
