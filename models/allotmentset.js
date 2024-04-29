import mongoose from 'mongoose'

const allotmentSetSchema = new mongoose.Schema(
  {
    allotments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Allotment',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const AllotmentSet = mongoose.model('AllotmentSet', allotmentSetSchema)
export default AllotmentSet
