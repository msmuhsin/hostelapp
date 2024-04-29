import allotmentModel from '../models/allotment.js'
import express from 'express'
import studentModel from '../models/student.js'
import { handleAllotment } from '../utils/allotment.js'
import allotmentSetModel from '../models/allotmentset.js'
import seatsModel from '../models/seats.js'

const router = express.Router()

function calculateSemesterSeatDistribution(totalSeats) {
  const seatsPerSemester = Math.floor(totalSeats / 5)
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
  const seatsPerCategory = Math.floor(totalSeats / 4)
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
    const latestAllotment = await allotmentModel
      .findOne()
      .sort({ createdAt: -1 })

    if (latestAllotment) {
      const allotmentData = {}

      const sections = ['MH', 'LH']
      const semesters = ['S1', 'S3', 'S5', 'S7', 'S9', 'M1', 'M3']
      const categories = ['SC', 'ST', 'PH', 'BPL', 'General']

      for (const section of sections) {
        allotmentData[section] = {}

        for (const semester of semesters) {
          allotmentData[section][semester] = {}
          for (const category of categories) {
            if (
              latestAllotment[section][semester] &&
              latestAllotment[section][semester][category] &&
              latestAllotment[section][semester][category].length > 0
            ) {
              const students = await studentModel.find({
                _id: { $in: latestAllotment[section][semester][category] },
              })

              allotmentData[section][semester][category] = students
            }
          }
        }
      }

      res.send({
        message: 'Allotment data fetched successfully',
        success: true,
        allotmentData,
      })
    } else {
      res.status(404).send('No allotment found.') // Send a 404 status code if no allotment is found
    }
  } catch (error) {
    console.error(error) // Log the error
    res
      .status(500)
      .send({ message: 'Error while getting list of allotment from database' })
  }
})

router.post('/newallotment', async (req, res) => {
  const { previousAllotmentNo, previousAllotmentId, allotmentSetId } = req.body

  try {
    const [previousAllotment, previousAllotmentSeatData] = await Promise.all([
      allotmentModel.findById(previousAllotmentId),
      seatsModel.findOne({ allotmentId: previousAllotmentId }),
    ])

    const seatData = {
      UGMH: {
        S1: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S3: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S5: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S7: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
      },
      UGLH: {
        S1: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S3: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S5: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S7: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
      },
      PGMH: {
        M1: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        M3: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S9: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
      },
      PGLH: {
        M1: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        M3: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S9: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
      },
    }

    const HostelTypes = ['MH', 'LH']
    const All_Semesters = ['S1', 'S3', 'S5', 'S7', 'M1', 'M3', 'S9']
    const categories = ['SC', 'ST', 'PH', 'BPL', 'General']

    const countData = {
      MH: {
        S1: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S3: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S5: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S7: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        M1: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        M3: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S9: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
      },
      LH: {
        S1: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S3: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S5: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S7: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        M1: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        M3: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
        S9: {
          SC: 0,
          ST: 0,
          PH: 0,
          BPL: 0,
          General: 0,
        },
      },
    }

    const students = []

    for (const hostel_type of HostelTypes) {
      if (!previousAllotment[hostel_type]) {
        continue
      }
      for (const semester of All_Semesters) {
        if (!previousAllotment[hostel_type][semester]) {
          continue
        }
        for (const category of categories) {
          if (
            !previousAllotment[hostel_type][semester] ||
            !previousAllotment[hostel_type][semester][category]
          ) {
            continue
          }
          if (previousAllotment[hostel_type][semester][category]) {
            for (const studentId of previousAllotment[hostel_type][semester][
              category
            ]) {
              students.push(studentId)
            }
          }
        }
      }
    }

    const studentsData = await studentModel.find({
      _id: { $in: students },
      roomNo: { $ne: '' },
    })

    for (const hostel_type of HostelTypes) {
      for (const semester of All_Semesters) {
        for (const category of categories) {
          const students =
            previousAllotment?.[hostel_type]?.[semester]?.[category] || []
          const filteredStudents = students.filter((studentId) =>
            studentsData.find(
              (student) =>
                student._id.toString() === studentId.toString() &&
                student.roomNo !== ''
            )
          )
          countData[hostel_type][semester][category] = filteredStudents.length

          if (hostel_type === 'MH') {
            const isUG =
              semester === 'S1' ||
              semester === 'S3' ||
              semester === 'S5' ||
              semester === 'S7'
            const seatDataKey = isUG ? 'UGMH' : 'PGMH'
            seatData[seatDataKey][semester][category] = Math.max(
              0,
              previousAllotmentSeatData.seats.MH[semester][category] -
                countData[hostel_type][semester][category]
            )
          } else {
            const isUG =
              semester === 'S1' ||
              semester === 'S3' ||
              semester === 'S5' ||
              semester === 'S7'
            const seatDataKey = isUG ? 'UGLH' : 'PGLH'
            seatData[seatDataKey][semester][category] = Math.max(
              0,
              previousAllotmentSeatData.seats.LH[semester][category] -
                countData[hostel_type][semester][category]
            )
          }
        }
      }
    }

    const newAllotment = await allotmentModel.create({
      AllotmentNo: previousAllotmentNo + 1,
      AllotmentValuesForCalculation:
        previousAllotment.AllotmentValuesForCalculation,
    })

    await newAllotment.save()

    const AllotmentId = newAllotment._id

    await allotmentSetModel.findByIdAndUpdate(
      allotmentSetId,
      { $push: { allotments: AllotmentId } },
      { new: true }
    )

    const AllotmentSeats = await seatsModel.create({
      allotmentId: AllotmentId,
      seats: {
        MH: {
          S1: seatData.UGMH.S1,
          S3: seatData.UGMH.S3,
          S5: seatData.UGMH.S5,
          S7: seatData.UGMH.S7,
          M1: seatData.PGMH.M1,
          M3: seatData.PGMH.M3,
          S9: seatData.PGMH.S9,
        },
        LH: {
          S1: seatData.UGLH.S1,
          S3: seatData.UGLH.S3,
          S5: seatData.UGLH.S5,
          S7: seatData.UGLH.S7,
          M1: seatData.PGLH.M1,
          M3: seatData.PGLH.M3,
          S9: seatData.PGLH.S9,
        },
      },
    })

    await AllotmentSeats.save()

    await handleAllotment(
      HostelTypes,
      All_Semesters,
      AllotmentId,
      categories,
      seatData.UGMH,
      seatData.UGLH,
      seatData.PGMH,
      seatData.PGLH
    )
      .then(() => {
        res.send({
          message: 'Allotment done successfully',
          success: true,
          AllotmentId,
        })
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send('Error while allocating room')
      })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error while allocating room')
  }
})

router.post('/', async (req, res) => {
  try {
    // Get all students in descending order of score

    const allotmentValues = req.body.AllotmentValuesForCalculation
    const { MH, LH } = allotmentValues

    const newAllotment = await allotmentModel.create({
      AllotmentNo: 1,
      AllotmentValuesForCalculation: {
        MH: MH,
        LH: LH,
      },
    })

    await newAllotment.save()

    const AllotmentId = newAllotment._id

    const newAllotmentSet = await allotmentSetModel.create({
      allotments: [AllotmentId],
    })

    await newAllotmentSet.save()

    const AllotmentSetId = newAllotmentSet._id

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

      const total_no_of_SC_Seats_in_PG = Math.floor(
        total_no_SC_ST_PH_BPL_of_PG / 4
      )
      const total_no_of_PH_Seats_in_PG = Math.floor(
        total_no_SC_ST_PH_BPL_of_PG / 4
      )
      const total_no_of_ST_Seats_in_PG = Math.floor(
        total_no_SC_ST_PH_BPL_of_PG / 4
      )
      const total_no_of_BPL_Seats_in_PG =
        total_no_SC_ST_PH_BPL_of_PG -
        (total_no_of_SC_Seats_in_PG +
          total_no_of_PH_Seats_in_PG +
          total_no_of_ST_Seats_in_PG)

      const M1_Seats = Math.floor(PGSeats / 3)
      const M3_Seats = Math.floor(PGSeats / 3)
      const S9_Seats = PGSeats - (M1_Seats + M3_Seats)

      //M1 , M3, S9 :SC
      const SC_Seats_M1 = Math.floor(total_no_of_SC_Seats_in_PG / 3)
      const SC_Seats_M3 = Math.floor(total_no_of_SC_Seats_in_PG / 3)
      const SC_Seats_S9 =
        total_no_of_SC_Seats_in_PG - (SC_Seats_M1 + SC_Seats_M3)

      //M1, M3, S9 :ST

      const ST_Seats_M1 = Math.floor(total_no_of_ST_Seats_in_PG / 3)
      const ST_Seats_M3 = Math.floor(total_no_of_ST_Seats_in_PG / 3)
      const ST_Seats_S9 =
        total_no_of_ST_Seats_in_PG - (ST_Seats_M1 + ST_Seats_M3)

      //M1, M3, S9 :PH
      const PH_Seats_M1 = Math.floor(total_no_of_PH_Seats_in_PG / 3)
      const PH_Seats_M3 = Math.floor(total_no_of_PH_Seats_in_PG / 3)
      const PH_Seats_S9 =
        total_no_of_PH_Seats_in_PG - (PH_Seats_M1 + PH_Seats_M3)

      //M1, M3, S9 :BPL
      const BPL_Seats_M1 = Math.floor(total_no_of_BPL_Seats_in_PG / 3)
      const BPL_Seats_M3 = Math.floor(total_no_of_BPL_Seats_in_PG / 3)
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

    const AllotmentSeats = await seatsModel.create({
      allotmentId: AllotmentId,
      seats: {
        MH: {
          S1: seatDataUGMH.S1,
          S3: seatDataUGMH.S3,
          S5: seatDataUGMH.S5,
          S7: seatDataUGMH.S7,
          M1: seatDataPGMH.M1,
          M3: seatDataPGMH.M3,
          S9: seatDataPGMH.S9,
        },
        LH: {
          S1: seatDataUGLH.S1,
          S3: seatDataUGLH.S3,
          S5: seatDataUGLH.S5,
          S7: seatDataUGLH.S7,
          M1: seatDataPGLH.M1,
          M3: seatDataPGLH.M3,
          S9: seatDataPGLH.S9,
        },
      },
    })

    await AllotmentSeats.save()

    // console.log({
    //   'seatDataUG_MH : ': seatDataUGMH,
    //   'seatDataUG_LH : ': seatDataUGLH,
    //   'seatDataPG_MH : ': seatDataPGMH,
    //   'seatDataPG_LH : ': seatDataPGMH,
    // })

    // return res.send('Allotment done successfully')

    //? Allocation Of Seats for UG

    const All_Semesters = ['S1', 'S3', 'S5', 'S7', 'M1', 'M3', 'S9']
    const categories = ['SC', 'ST', 'PH', 'BPL']

    await handleAllotment(
      HostelTypes,
      All_Semesters,
      AllotmentId,
      categories,
      seatDataUGMH,
      seatDataUGLH,
      seatDataPGMH,
      seatDataPGLH
    )
      .then(async () => {
        res.send({
          message: 'Allotment done successfully',
          success: true,
          AllotmentSetId,
        })
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send('Error while allocating room')
      })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error while allocating room')
  }
})

export default router
