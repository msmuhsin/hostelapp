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
    // Get all students in descending order of score
    const students = await studentModel.find().sort({ score: -1 })

    const allotmentValues = req.body.AllotmentValuesForCalculation
    const { MH, LH } = allotmentValues

    const newAllotment = await allotmentModel.create({
      AllotmentValuesForCalculation: {
        MH: MH,
        LH: LH,
      },
    })

    await newAllotment.save()

    //Id of the newly created allotment
    const AllotmentId = newAllotment._id

    //? Calculation of Seats for MH
    const total_SC_ST_PH_BPL_seats = MH.SC_ST_PH_BPL.totalSeats

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
    //   const S1Seats = S1.totalSeats
    const SC_Seats_S1 = Math.round(total_no_SC_ST_PH_BPL_of_S1 / 4)
    const PH_Seats_S1 = Math.round(total_no_SC_ST_PH_BPL_of_S1 / 4)
    const ST_Seats_S1 = Math.round(total_no_SC_ST_PH_BPL_of_S1 / 4)
    const BPL_Seats_S1 =
      total_no_SC_ST_PH_BPL_of_S1 - (ST_Seats_S1 + PH_Seats_S1 + SC_Seats_S1)

    //S3
    //   const S3Seats = S3.totalSeats
    const SC_Seats_S3 = Math.round(total_no_SC_ST_PH_BPL_of_S3 / 4)
    const PH_Seats_S3 = Math.round(total_no_SC_ST_PH_BPL_of_S3 / 4)
    const ST_Seats_S3 = Math.round(total_no_SC_ST_PH_BPL_of_S3 / 4)
    const BPL_Seats_S3 =
      total_no_SC_ST_PH_BPL_of_S3 - (ST_Seats_S3 + PH_Seats_S3 + SC_Seats_S3)

    //S5
    //   const S5Seats = S5.totalSeats
    const SC_Seats_S5 = Math.round(total_no_SC_ST_PH_BPL_of_S5 / 4)
    const PH_Seats_S5 = Math.round(total_no_SC_ST_PH_BPL_of_S5 / 4)
    const ST_Seats_S5 = Math.round(total_no_SC_ST_PH_BPL_of_S5 / 4)
    const BPL_Seats_S5 =
      total_no_SC_ST_PH_BPL_of_S5 - (ST_Seats_S5 + PH_Seats_S5 + SC_Seats_S5)

    //S7
    //   const S7Seats = S7.totalSeats
    const SC_Seats_S7 = Math.round(total_no_SC_ST_PH_BPL_of_S7 / 4)
    const PH_Seats_S7 = Math.round(total_no_SC_ST_PH_BPL_of_S7 / 4)
    const ST_Seats_S7 = Math.round(total_no_SC_ST_PH_BPL_of_S7 / 4)
    const BPL_Seats_S7 =
      total_no_SC_ST_PH_BPL_of_S7 - (ST_Seats_S7 + PH_Seats_S7 + SC_Seats_S7)

    const seatDataUG = {
      S1: {
        SC: SC_Seats_S1,
        ST: ST_Seats_S1,
        PH: PH_Seats_S1,
        BPL: BPL_Seats_S1,
      },
      S3: {
        SC: SC_Seats_S3,
        ST: ST_Seats_S3,
        PH: PH_Seats_S3,
        BPL: BPL_Seats_S3,
      },
      S5: {
        SC: SC_Seats_S5,
        ST: ST_Seats_S5,
        PH: PH_Seats_S5,
        BPL: BPL_Seats_S5,
      },
      S7: {
        SC: SC_Seats_S7,
        ST: ST_Seats_S7,
        PH: PH_Seats_S7,
        BPL: BPL_Seats_S7,
      },
    }

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
    const SC_Seats_M1 = Math.round(total_no_of_SC_Seats_in_PG / 3)
    const SC_Seats_M3 = Math.round(total_no_of_SC_Seats_in_PG / 3)
    const SC_Seats_S9 = total_no_of_SC_Seats_in_PG - (SC_Seats_M1 + SC_Seats_M3)

    //M1, M3, S9 :ST

    const ST_Seats_M1 = Math.round(total_no_of_ST_Seats_in_PG / 3)
    const ST_Seats_M3 = Math.round(total_no_of_ST_Seats_in_PG / 3)
    const ST_Seats_S9 = total_no_of_ST_Seats_in_PG - (ST_Seats_M1 + ST_Seats_M3)

    //M1, M3, S9 :PH
    const PH_Seats_M1 = Math.round(total_no_of_PH_Seats_in_PG / 3)
    const PH_Seats_M3 = Math.round(total_no_of_PH_Seats_in_PG / 3)
    const PH_Seats_S9 = total_no_of_PH_Seats_in_PG - (PH_Seats_M1 + PH_Seats_M3)

    //M1, M3, S9 :BPL
    const BPL_Seats_M1 = Math.round(total_no_of_BPL_Seats_in_PG / 3)
    const BPL_Seats_M3 = Math.round(total_no_of_BPL_Seats_in_PG / 3)
    const BPL_Seats_S9 =
      total_no_of_BPL_Seats_in_PG - (BPL_Seats_M1 + BPL_Seats_M3)

    const seatDataPG = {
      M1: {
        SC: SC_Seats_M1,
        ST: ST_Seats_M1,
        PH: PH_Seats_M1,
        BPL: BPL_Seats_M1,
      },
      M3: {
        SC: SC_Seats_M3,
        ST: ST_Seats_M3,
        PH: PH_Seats_M3,
        BPL: BPL_Seats_M3,
      },
      S9: {
        SC: SC_Seats_S9,
        ST: ST_Seats_S9,
        PH: PH_Seats_S9,
        BPL: BPL_Seats_S9,
      },
    }

    //? Allocation Of Seats for UG
    const UG_Semesters = ['S1', 'S3', 'S5', 'S7']

    for (const semester of UG_Semesters) {
      const semesterSeats = allotmentValues.MH[semester].totalSeats

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
        { _id: AllotmentId },
        updateQuery,
        { new: true }
      )

      await updatedAllotment.save()

      const categories = ['SC', 'ST', 'PH', 'BPL']

      for (const category of categories) {

        const studentInCategoryForSemester = students.filter(
          (student) =>
            student.sem === semester &&
            (student.quota == [category] + '_APL' ||
              student.quota == [category] + '_BPL') &&
            !student.allotted
        )

        const categorySeats = seatDataUG[semester][category]

        const allottedStudents = allocateStudents(
          studentInCategoryForSemester,
          categorySeats
        )

        const allottedStudentIds = allottedStudents.map(
          (student) => student._id
        )

        // Update 'allotted' status for students

        await studentModel.updateMany(
          { _id: { $in: allottedStudentIds } },
          { allotted: true }
        )

        // Create or update allotment document
        const updateQuery = {
          MH: {
            [semester]: {
              [category]: allottedStudentIds,
            },
          },
        }

        const updatedAllotment = await allotmentModel.findOneAndUpdate(
          { _id: AllotmentId },
          updateQuery,
          { new: true }
        )

        await updatedAllotment.save()
      }
    }

    //? Allocation Of Seats for PG

    const PG_Semesters = ['M1', 'M3', 'S9']

    for (const semester of PG_Semesters) {
      const semesterSeats = allotmentValues.MH.PG.totalSeats

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
          PG: {
            General: allottedStudentIds,
          },
        },
      }

      const updatedAllotment = await allotmentModel.findOneAndUpdate(
        { _id: AllotmentId },
        updateQuery,
        { new: true }
      )

      await updatedAllotment.save()

      const categories = ['SC', 'ST', 'PH', 'BPL']

      for (const category of categories) {
        const studentInCategoryForSemester = students.filter(
          (student) =>
            student.sem === semester &&
            (student.quota == [category] + '_APL' ||
              student.quota == [category] + '_BPL') &&
            !student.allotted
        )

        const categorySeats = category + '_Seats_PG' //referencing the seats for the category in the semester from above

        const allottedStudents = allocateStudents(
          studentInCategoryForSemester,
          categorySeats
        )

        const allottedStudentIds = allottedStudents.map(
          (student) => student._id
        )

        // Update 'allotted' status for students

        await studentModel.updateMany(
          { _id: { $in: allottedStudentIds } },
          { allotted: true }
        )

        // Create or update allotment document
        const updateQuery = {
          MH: {
            PG: {
              [category]: allottedStudentIds,
            },
          },
        }

        const updatedAllotment = await allotmentModel.findOneAndUpdate(
          { _id: AllotmentId },
          updateQuery,
          { new: true }
        )

        await updatedAllotment.save()
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Error while allocating room')
  }
})
