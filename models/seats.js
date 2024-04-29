import mongoose from 'mongoose'

const seatSchema = new mongoose.Schema({
  allotmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Allotment',
    required: true,
  },
  seats: {
    MH: {
      S1: {
        General: Number,
        SC: Number,
        ST: Number,
        PH: Number,
        BPL: Number,
      },
      S3: {
        General: Number,
        SC: Number,
        ST: Number,
        PH: Number,
        BPL: Number,
      },
      S5: {
        General: Number,
        SC: Number,
        ST: Number,
        PH: Number,
        BPL: Number,
      },
      S7: {
        General: Number,
        SC: Number,
        ST: Number,
        PH: Number,
        BPL: Number,
      },
      S9: {
        General: Number,
        SC: Number,
        ST: Number,
        PH: Number,
        BPL: Number,
      },
      M1: {
        General: Number,
        SC: Number,
        ST: Number,
        PH: Number,
        BPL: Number,
      },
      M3: {
        General: Number,
        SC: Number,
        ST: Number,
        PH: Number,
        BPL: Number,
      },
    },
    LH: {
      S1: {
        General: Number,
        SC: Number,
        ST: Number,
        PH: Number,
        BPL: Number,
      },
      S3: {
        General: Number,
        SC: Number,
        ST: Number,
        PH: Number,
        BPL: Number,
      },
      S5: {
        General: Number,
        SC: Number,
        ST: Number,
        PH: Number,
        BPL: Number,
      },
      S7: {
        General: Number,
        SC: Number,
        ST: Number,
        PH: Number,
        BPL: Number,
      },
      S9: {
        General: Number,
        SC: Number,
        ST: Number,
        PH: Number,
        BPL: Number,
      },
      M1: {
        General: Number,
        SC: Number,
        ST: Number,
        PH: Number,
        BPL: Number,
      },
      M3: {
        General: Number,
        SC: Number,
        ST: Number,
        PH: Number,
        BPL: Number,
      },
    },
  },
})

const Seat = mongoose.model('Seat', seatSchema)

export default Seat
