import express from 'express'
import studentModel from '../models/student.js'
import calculateScore from '../utils/scoring.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const {
    admNo,
    regNo,
    name,
    gender,
    dob,
    mobile,
    email,
    permenentaddress,
    presentaddress,
    pincode,
    distance,
    caste,
    quota,
    income,
    branch,
    sem,
    cgpa,
  } = req.body

  if (
    !admNo ||
    !regNo ||
    !name ||
    !gender ||
    !dob ||
    !mobile ||
    !email ||
    !permenentaddress ||
    !presentaddress ||
    !pincode ||
    !distance ||
    !caste ||
    !quota ||
    !income ||
    !branch ||
    !sem ||
    !cgpa 
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    const student = new studentModel({
      appllNo: '1',
      admNo: admNo,
      regNo: regNo,
      name: name,
      gender: gender,
      dob: dob,
      mobile: mobile,
      email: email,
      permenentAddress: permenentaddress,
      presentAddress: presentaddress,
      pincode: pincode,
      distance: distance,
      caste: caste,
      quota: quota,
      income: income,
      branch: branch,
      sem: sem,
      cgpa: cgpa,
    })

    await student.save()

    res
      .status(201)
      .json({ message: 'Student created successfully', data: student })
  } catch (error) {
    console.log(error)
  }
})

router.get('/', async (req, res) => {
  const allStudents = await studentModel.find({})

  for (let i = 0; i < allStudents.length; i++) {
    const StudentData = allStudents[i]
    const studentScore = calculateScore(StudentData)

    if(studentScore != undefined){
     const updateStudent =  await studentModel.findByIdAndUpdate(
        { _id: StudentData._id },
        { score: studentScor(0)}
      )

      console.log(updateStudent);
    }
  }
})

export default router
