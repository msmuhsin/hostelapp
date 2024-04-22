import express from 'express'
import studentModel from '../models/student.js'
import calculateScore from '../utils/scoring.js'

const router = express.Router()

router.post('/', async (req, res) => {

  console.log(req.body);

  const {
    Admno,
    Regno,
    Name,
    Gender,
    DOB,
    Mobile,
    Email,
    PermanentAddress,
    PresentAddress,
    PinCode,
    Distance,
    Caste,
    Quota,
    Income,
    Branch,
    Sem,
    CGPA,
  } = req.body



  if (
    !Admno ||
    !Regno ||
    !Name ||
    !Gender ||
    !DOB ||
    !Mobile ||
    !Email ||
    !PermanentAddress ||
    !PresentAddress ||
    !PinCode ||
    !Distance ||
    !Caste ||
    !Quota ||
    !Income ||
    !Branch ||
    !Sem ||
    !CGPA
  ) {
    return res
      .status(400)
      .json({ message: 'All fields are required', success: false })
  }

  const isExistingStudent = await studentModel.findOne({ admNo: Admno })

  if (isExistingStudent) {
    return res.status(400).json({
      message: 'Student already exists cannot register again',
      success: false,
    })
  }

  const isExistingRegno = await studentModel.findOne({ regNo: Regno })

  if (isExistingRegno) {
    return res.status(400).json({
      message: 'Student already exists cannot register again',
      success: false,
    })
  }

  try {
    const student = new studentModel({
      admNo: Admno,
      regNo: Regno,
      name: Name,
      dob: DOB,
      mobileNo: Mobile,
      email: Email,
      permanentAddress: PermanentAddress,
      presentAddress: PresentAddress,
      pincode: PinCode,
      distance: Distance,
      caste: Caste,
      gender: Gender,
      quota: Quota,
      income: Income,
      branch: Branch,
      sem: Sem,
      cgpa: CGPA,
    })

    await student.save()

    res.status(201).json({
      message: 'Student created successfully',
      data: student,
      success: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message, success: false })
  }
})

router.get('/', async (req, res) => {
  try {
    const allStudents = await studentModel.find({})
    res.status(200).json({ allStudents, success: true })
  } catch (error) {
    res.status(500).json({ message: error.message, success: false })
  }

  // for (let i = 0; i < allStudents.length; i++) {
  //   const StudentData = allStudents[i]
  //   const studentScore = calculateScore(StudentData)

  //   if (studentScore != undefined) {
  //     const updateStudent = await studentModel.findByIdAndUpdate(
  //       StudentData._id,
  //       { score: parseFloat(studentScore).toFixed(2) }
  //     )

  //     console.log(updateStudent)
  //   }
  // }
})

export default router
