import mongoose from 'mongoose';

const allotmentSchema = new mongoose.Schema({
    AllotmentValuesForCalculation: {
        vacancyAvailable: Number,
        SC_ST_PH_BPL: {
            percentage: Number,
            totalSeats: Number
        },
        S1: {
            percentage: Number,
            totalSeats: Number
        },
        S3: {
            percentage: Number,
            totalSeats: Number
        },
        S5: {
            percentage: Number,
            totalSeats: Number
        },
        S7: {
            percentage: Number,
            totalSeats: Number
        },
        PG: {
            percentage: Number,
            totalSeats: Number
        }
    },
    MH: {
        S1: {
            SC_ST_PH_BPL: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }],
            General: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }]
        },
        S3: {
            SC_ST_PH_BPL: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }],
            General: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }]
        },

        S5: {
            SC_ST_PH_BPL: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }],
            General: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }]
        },
        S7: {
            SC_ST_PH_BPL: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }],
            General: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }]
        },
        S9: {
            SC_ST_PH_BPL: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }],
            General: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }]
        },
        M1: {
            SC_ST_PH_BPL: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }],
            General: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }]
        },
        M2: {
            SC_ST_PH_BPL: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }],
            General: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }]
        },
    },
    LH: {
        S1: {
            SC_ST_PH_BPL: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }],
            General: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }]
        },
        S3: {
            SC_ST_PH_BPL: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }],
            General: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }]
        },

        S5: {
            SC_ST_PH_BPL: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }],
            General: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }]
        },
        S7: {
            SC_ST_PH_BPL: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }],
            General: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }]
        },
        S9: {
            SC_ST_PH_BPL: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }],
            General: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }]
        },
        M1: {
            SC_ST_PH_BPL: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }],
            General: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }]
        },
        M2: {
            SC_ST_PH_BPL: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }],
            General: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }]
        },
    }
});


const Allotment = mongoose.model('Allotment', allotmentSchema)
export default Allotment