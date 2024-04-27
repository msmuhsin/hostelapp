import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  applNo: {
    type: Number,
    unique: true,
  },
  admNo: {
    type: String,
  },
  regNo: {
    type: String,
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
  email: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  presentAddress: {
    type: String,
  },
  pincode: {
    type: String,
  },
  distance: {
    type: String,
  },
  caste: {
    type: String,
  },
  quota: {
    type: String,
  },
  income: {
    type: String,
  },
  branch: {
    type: String,
  },
  sem: {
    type: String,
  },
  cgpa: {
    type: String,
  },
  score: {
    type: Number,
  },
  roomNo: {
    type: String,
    default: '',
  },
  allotted: {
    type: Boolean,
    default: false,
  },
  dataError: {
    type: Boolean,
    default: false,
  },
  studentRemovedFromList: {
    type: Boolean,
    default: false,
  },
})

studentSchema.pre('save', async function (next) {
  // Check if the document is new or being updated
  if (!this.isNew) {
    return next()
  }

  try {
    const highestApplication = await this.constructor
      .findOne({}, { applNo: 1 })
      .sort({ applNo: -1 })
      .limit(1)

    const nextApplicationNo = highestApplication
      ? highestApplication.applNo + 1
      : 1000

    this.applNo = nextApplicationNo

    next()
  } catch (error) {
    next(error)
  }
})

const Student = mongoose.model('Student', studentSchema)
export default Student
