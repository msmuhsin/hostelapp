import mongoose from 'mongoose'

const allotmentSchema = new mongoose.Schema(
  {
    AllotmentNo: {
      type: Number,
      required: true,
    },
    AllotmentValuesForCalculation: {
      MH: {
        vacancyAvailable: Number,
        SC_ST_PH_BPL: {
          percentage: Number,
          totalSeats: Number,
        },
        S1: {
          percentage: Number,
          totalSeats: Number,
        },
        S3: {
          percentage: Number,
          totalSeats: Number,
        },
        S5: {
          percentage: Number,
          totalSeats: Number,
        },
        S7: {
          percentage: Number,
          totalSeats: Number,
        },
        PG: {
          percentage: Number,
          totalSeats: Number,
        },
      },
      LH: {
        vacancyAvailable: Number,
        SC_ST_PH_BPL: {
          percentage: Number,
          totalSeats: Number,
        },
        S1: {
          percentage: Number,
          totalSeats: Number,
        },
        S3: {
          percentage: Number,
          totalSeats: Number,
        },
        S5: {
          percentage: Number,
          totalSeats: Number,
        },
        S7: {
          percentage: Number,
          totalSeats: Number,
        },
        PG: {
          percentage: Number,
          totalSeats: Number,
        },
      },
    },
    MH: {
      S1: {
        SC: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        ST: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        PH: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        BPL: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        General: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
      },
      S3: {
        SC: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        ST: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        PH: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        BPL: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        General: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
      },

      S5: {
        SC: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        ST: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        PH: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        BPL: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        General: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
      },
      S7: {
        SC: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        ST: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        PH: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        BPL: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        General: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
      },
      S9: {
        SC: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        ST: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        PH: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        BPL: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        General: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
      },
      M1: {
        SC: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        ST: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        PH: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        BPL: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        General: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
      },
      M2: {
        SC: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        ST: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        PH: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        BPL: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        General: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
      },
    },
    LH: {
      S1: {
        SC: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        ST: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        PH: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        BPL: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],

        General: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
      },
      S3: {
        SC: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        ST: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        PH: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        BPL: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],

        General: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
      },

      S5: {
        SC: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        ST: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        PH: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        BPL: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],

        General: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
      },
      S7: {
        SC: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        ST: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        PH: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        BPL: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],

        General: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
      },
      S9: {
        SC: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        ST: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        PH: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        BPL: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        General: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
      },
      M1: {
        SC: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        ST: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        PH: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        BPL: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        General: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
      },
      M3: {
        SC: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        ST: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        PH: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        BPL: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
        General: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],
      },
    },
  },
  {
    timestamps: true,
  }
)

const Allotment = mongoose.model('Allotment', allotmentSchema)
export default Allotment
