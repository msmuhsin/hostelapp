import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  appllNo: {
    type: Number,
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
  permententAddress: {
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
  qouta: {
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
    type: Number,
  },
  dataError: {
    type: Boolean,
    default: false,
  },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
