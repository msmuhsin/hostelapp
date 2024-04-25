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

function calculateSemesterSeatDistribution(totalSeats) {
  const seatsPerSemester = Math.round(totalSeats / 5)
  const seatDistribution = {
    S1: seatsPerSemester,
    S3: seatsPerSemester,
    S5: seatsPerSemester,
    S7: seatsPerSemester,
    PG: totalSeats - seatsPerSemester * 4,
  }
  return seatDistribution
}

function calculateCategorySeatDistribution(totalSeats) {
  const seatsPerCategory = Math.round(totalSeats / 4)
  const categoryDistribution = {
    SC: seatsPerCategory,
    ST: seatsPerCategory,
    PH: seatsPerCategory,
    BPL: totalSeats - seatsPerCategory * 3,
  }
  return categoryDistribution
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

    const allotmentValues = req.body.AllotmentValuesForCalculation
    const { MH, LH } = allotmentValues

    const newAllotment = await allotmentModel.create({
      AllotmentValuesForCalculation: {
        MH: MH,
        LH: LH,
      },
    })

    await newAllotment.save()

    const AllotmentId = newAllotment._id

    const HostelTypes = ['MH', 'LH']

    let seatDataUGMH = {}
    let seatDataUGLH = {}

    let seatDataPGMH = {}
    let seatDataPGLH = {}

    for (const hostel_type of HostelTypes) {
      let total_SC_ST_PH_BPL_seats = 0

      if (hostel_type === 'MH') {
        total_SC_ST_PH_BPL_seats = MH.SC_ST_PH_BPL.totalSeats
      } else if (hostel_type === 'LH') {
        total_SC_ST_PH_BPL_seats = LH.SC_ST_PH_BPL.totalSeats
      }

      const seatData_SC_ST_PH_BPL_Of_Semester =
        calculateSemesterSeatDistribution(total_SC_ST_PH_BPL_seats)

      //Divided into 5 parts S1, S3, S5, S7, PG
      const total_no_SC_ST_PH_BPL_of_S1 = seatData_SC_ST_PH_BPL_Of_Semester.S1
      const total_no_SC_ST_PH_BPL_of_S3 = seatData_SC_ST_PH_BPL_Of_Semester.S3
      const total_no_SC_ST_PH_BPL_of_S5 = seatData_SC_ST_PH_BPL_Of_Semester.S5
      const total_no_SC_ST_PH_BPL_of_S7 = seatData_SC_ST_PH_BPL_Of_Semester.S7
      const total_no_SC_ST_PH_BPL_of_PG = seatData_SC_ST_PH_BPL_Of_Semester.PG

      const seatData_S1 = calculateCategorySeatDistribution(
        total_no_SC_ST_PH_BPL_of_S1
      )

      const seatData_S3 = calculateCategorySeatDistribution(
        total_no_SC_ST_PH_BPL_of_S3
      )

      const seatData_S5 = calculateCategorySeatDistribution(
        total_no_SC_ST_PH_BPL_of_S5
      )

      const seatData_S7 = calculateCategorySeatDistribution(
        total_no_SC_ST_PH_BPL_of_S7
      )

      //S1
      const S1Seats = hostel_type == 'MH' ? MH.S1.totalSeats : LH.S1.totalSeats
      const SC_Seats_S1 = seatData_S1.SC
      const PH_Seats_S1 = seatData_S1.PH
      const ST_Seats_S1 = seatData_S1.ST
      const BPL_Seats_S1 = seatData_S1.BPL

      //S3
      const S3Seats = hostel_type == 'MH' ? MH.S3.totalSeats : LH.S3.totalSeats
      const SC_Seats_S3 = seatData_S3.SC
      const PH_Seats_S3 = seatData_S3.PH
      const ST_Seats_S3 = seatData_S3.ST
      const BPL_Seats_S3 = seatData_S3.BPL

      //S5
      const S5Seats = hostel_type == 'MH' ? MH.S5.totalSeats : LH.S5.totalSeats
      const SC_Seats_S5 = seatData_S5.SC
      const PH_Seats_S5 = seatData_S5.PH
      const ST_Seats_S5 = seatData_S5.ST
      const BPL_Seats_S5 = seatData_S5.BPL

      //S7
      const S7Seats = hostel_type == 'MH' ? MH.S7.totalSeats : LH.S7.totalSeats
      const SC_Seats_S7 = seatData_S7.SC
      const PH_Seats_S7 = seatData_S7.PH
      const ST_Seats_S7 = seatData_S7.ST
      const BPL_Seats_S7 = seatData_S7.BPL



      if (hostel_type === 'MH') {
        seatDataUGMH = {
          S1: {
            General: S1Seats,
            SC: SC_Seats_S1,
            ST: ST_Seats_S1,
            PH: PH_Seats_S1,
            BPL: BPL_Seats_S1,
          },
          S3: {
            General: S3Seats,
            SC: SC_Seats_S3,
            ST: ST_Seats_S3,
            PH: PH_Seats_S3,
            BPL: BPL_Seats_S3,
          },
          S5: {
            General: S5Seats,
            SC: SC_Seats_S5,
            ST: ST_Seats_S5,
            PH: PH_Seats_S5,
            BPL: BPL_Seats_S5,
          },
          S7: {
            General: S7Seats,
            SC: SC_Seats_S7,
            ST: ST_Seats_S7,
            PH: PH_Seats_S7,
            BPL: BPL_Seats_S7,
          },
        }
      } else {
        seatDataUGLH = {
          S1: {
            General: S1Seats,
            SC: SC_Seats_S1,
            ST: ST_Seats_S1,
            PH: PH_Seats_S1,
            BPL: BPL_Seats_S1,
          },
          S3: {
            General: S3Seats,
            SC: SC_Seats_S3,
            ST: ST_Seats_S3,
            PH: PH_Seats_S3,
            BPL: BPL_Seats_S3,
          },
          S5: {
            General: S5Seats,
            SC: SC_Seats_S5,
            ST: ST_Seats_S5,
            PH: PH_Seats_S5,
            BPL: BPL_Seats_S5,
          },
          S7: {
            General: S7Seats,
            SC: SC_Seats_S7,
            ST: ST_Seats_S7,
            PH: PH_Seats_S7,
            BPL: BPL_Seats_S7,
          },
        }
      }

      //PG
      const PGSeats = hostel_type == 'MH' ? MH.PG.totalSeats : LH.PG.totalSeats

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

      const M1_Seats = Math.ceil(PGSeats / 3)
      const M3_Seats = Math.ceil(PGSeats / 3)
      const S9_Seats = PGSeats - (M1_Seats + M3_Seats)

      //M1 , M3, S9 :SC
      const SC_Seats_M1 = Math.round(total_no_of_SC_Seats_in_PG / 3)
      const SC_Seats_M3 = Math.round(total_no_of_SC_Seats_in_PG / 3)
      const SC_Seats_S9 =
        total_no_of_SC_Seats_in_PG - (SC_Seats_M1 + SC_Seats_M3)

      //M1, M3, S9 :ST

      const ST_Seats_M1 = Math.round(total_no_of_ST_Seats_in_PG / 3)
      const ST_Seats_M3 = Math.round(total_no_of_ST_Seats_in_PG / 3)
      const ST_Seats_S9 =
        total_no_of_ST_Seats_in_PG - (ST_Seats_M1 + ST_Seats_M3)

      //M1, M3, S9 :PH
      const PH_Seats_M1 = Math.round(total_no_of_PH_Seats_in_PG / 3)
      const PH_Seats_M3 = Math.round(total_no_of_PH_Seats_in_PG / 3)
      const PH_Seats_S9 =
        total_no_of_PH_Seats_in_PG - (PH_Seats_M1 + PH_Seats_M3)

      //M1, M3, S9 :BPL
      const BPL_Seats_M1 = Math.round(total_no_of_BPL_Seats_in_PG / 3)
      const BPL_Seats_M3 = Math.round(total_no_of_BPL_Seats_in_PG / 3)
      const BPL_Seats_S9 =
        total_no_of_BPL_Seats_in_PG - (BPL_Seats_M1 + BPL_Seats_M3)

      if (hostel_type === 'MH') {
        seatDataPGMH = {
          M1: {
            General: M1_Seats,
            SC: SC_Seats_M1,
            ST: ST_Seats_M1,
            PH: PH_Seats_M1,
            BPL: BPL_Seats_M1,
          },
          M3: {
            General: M3_Seats,
            SC: SC_Seats_M3,
            ST: ST_Seats_M3,
            PH: PH_Seats_M3,
            BPL: BPL_Seats_M3,
          },
          S9: {
            General: S9_Seats,
            SC: SC_Seats_S9,
            ST: ST_Seats_S9,
            PH: PH_Seats_S9,
            BPL: BPL_Seats_S9,
          },
        }
      } else {
        seatDataPGLH = {
          M1: {
            General: M1_Seats,
            SC: SC_Seats_M1,
            ST: ST_Seats_M1,
            PH: PH_Seats_M1,
            BPL: BPL_Seats_M1,
          },
          M3: {
            General: M3_Seats,
            SC: SC_Seats_M3,
            ST: ST_Seats_M3,
            PH: PH_Seats_M3,
            BPL: BPL_Seats_M3,
          },
          S9: {
            General: S9_Seats,
            SC: SC_Seats_S9,
            ST: ST_Seats_S9,
            PH: PH_Seats_S9,
            BPL: BPL_Seats_S9,
          },
        }
      }
    }

    //? Allocation Of Seats for UG
    const All_Semesters = ['S1', 'S3', 'S5', 'S7', 'M1', 'M3', 'S9']
    const categories = ['SC', 'ST', 'PH', 'BPL']

    for (const hostel_type of HostelTypes) {
      for (const semester of All_Semesters) {
        const students = await studentModel.find().sort({ score: -1 })

        let semesterSeatsGeneral = 0

        if (
          semester === 'S1' ||
          semester === 'S3' ||
          semester === 'S5' ||
          semester === 'S7'
        ) {
          if (hostel_type === 'MH') {
            semesterSeatsGeneral = seatDataUGMH[semester].General
          } else if (hostel_type === 'LH') {
            semesterSeatsGeneral = seatDataUGLH[semester].General
          }
        } else if (
          semester === 'M1' ||
          semester === 'M3' ||
          semester === 'S9'
        ) {
          if (hostel_type === 'MH') {
            semesterSeatsGeneral = seatDataPGMH[semester].General
          } else if (hostel_type === 'LH') {
            semesterSeatsGeneral = seatDataPGLH[semester].General
          }
        }

        const studentsInSemester = students.filter(
          (student) => student.sem === semester && !student.allotted
        )

        const allottedStudents = allocateStudents(
          studentsInSemester,
          semesterSeatsGeneral
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
          [hostel_type]: {
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

        for (const category of categories) {
          const newUpdatedStudents = await studentModel
            .find()
            .sort({ score: -1 })

          const studentEligibleForCategory = newUpdatedStudents.filter(
            (student) =>
              student.sem === semester &&
              (student.quota == [category] + '_APL' ||
                student.quota == [category] + '_BPL') &&
              !student.allotted
          )

          let categorySeats = 0

          if (
            semester === 'S1' ||
            semester === 'S3' ||
            semester === 'S5' ||
            semester === 'S7'
          ) {
            if (hostel_type === 'MH') {
              categorySeats = seatDataUGMH[semester][category]
            } else {
              categorySeats = seatDataUGLH[semester][category]
            }
          } else if (
            semester === 'M1' ||
            semester === 'M3' ||
            semester === 'S9'
          ) {
            if (hostel_type === 'MH') {
              categorySeats = seatDataPGMH[semester][category]
            } else {
              categorySeats = seatDataPGLH[semester][category]
            }
          }

          const allottedStudents = allocateStudents(
            studentEligibleForCategory,
            categorySeats
          )

          const allottedStudentIds = allottedStudents.map(
            (student) => student._id
          )

          // Update 'allotted' status for eligible students in the category
          await studentModel.updateMany(
            { _id: { $in: allottedStudentIds } },
            { allotted: true }
          )

          // Create or update allotment document
          const updateQuery = {
            [hostel_type]: {
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
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Error while allocating room')
  }
})
