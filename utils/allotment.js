import allotmentModel from '../models/allotment.js'
import studentModel from '../models/student.js'

function allocateStudents(students, seats) {
  const allocatedStudents = students.slice(0, seats)
  allocatedStudents.forEach((student) => {
    student.allotted = true
  })
  return allocatedStudents
}

async function handleAllotment(
  HostelTypes,
  All_Semesters,
  AllotmentId,
  categories,
  seatDataUGMH,
  seatDataUGLH,
  seatDataPGMH,
  seatDataPGLH
) {
  console.log(seatDataUGMH)
  console.log(seatDataUGLH)
  console.log(seatDataPGMH)
  console.log(seatDataPGLH)

  for (const hostel_type of HostelTypes) {
    for (const semester of All_Semesters) {
      const students = await studentModel
        .find({
          sem: semester,
          gender: hostel_type === 'MH' ? 'Male' : 'Female',
          studentRemovedFromList: false,
          allotted: false,
        })
        .sort({ score: -1 })

      if (students.length === 0) {
        continue
      }

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
      } else if (semester === 'M1' || semester === 'M3' || semester === 'S9') {
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

      const allottedStudentIds = allottedStudents.map((student) => student._id)

      // Update 'allotted' status for students
      await studentModel.updateMany(
        { _id: { $in: allottedStudentIds } },
        { allotted: true }
      )

      // const updatedAllotment = await allotmentModel.findByIdAndUpdate
      const updatedAllotment = await allotmentModel.findByIdAndUpdate(
        AllotmentId,
        {
          $set: {
            [`${hostel_type}.${semester}.General`]: allottedStudentIds,
          },
        },
        { new: true }
      )

      await updatedAllotment.save()

      for (const category of categories) {
        const newUpdatedStudents = await studentModel
          .find({
            sem: semester,
            gender: hostel_type === 'MH' ? 'Male' : 'Female',
            studentRemovedFromList: false,
            allotted: false,
          })
          .sort({ score: -1 })

        if (newUpdatedStudents.length === 0) {
          continue
        }

        let studentsEligibleForCategory

        if (category === 'ST' || category === 'SC' || category === 'PH') {
          studentsEligibleForCategory = newUpdatedStudents.filter(
            (student) =>
              student.sem === semester &&
              (student.quota == [category] + '-APL' ||
                student.quota == [category] + '-BPL') &&
              !student.allotted
          )
        } else if (category === 'BPL') {
          //get all quota where qutoa == -BPL at the end and student is not allotted and sem is same
          studentsEligibleForCategory = newUpdatedStudents.filter(
            (student) =>
              student.sem === semester &&
              student.quota.slice(-3) === 'BPL' &&
              !student.allotted
          )
        }

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

        console.log(category, categorySeats)

        const allottedStudentsCategoryWise = allocateStudents(
          studentsEligibleForCategory,
          categorySeats
        )

        const allottedStudentIdsCategoryWise = allottedStudentsCategoryWise.map(
          (student) => student._id
        )

        // // Update 'allotted' status for eligible students in the category
        await studentModel.updateMany(
          { _id: { $in: allottedStudentIdsCategoryWise } },
          { allotted: true }
        )

        // Create or update allotment document

        const updatedAllotmentCategoryWise =
          await allotmentModel.findByIdAndUpdate(
            AllotmentId,
            {
              $set: {
                [`${hostel_type}.${semester}.${category}`]:
                  allottedStudentIdsCategoryWise,
              },
            },
            { new: true }
          )

        await updatedAllotmentCategoryWise.save()
      }
    }
  }
}

export { handleAllotment }
