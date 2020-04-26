const mongoose = require('mongoose')

const RecordSchema = new mongoose.Schema({
    time:{
        type: Date,
        default: Date.now
    },
    topic:{
        type: String,
        default: "detection"
    },
    status:{
        type: String,
        required: (true,"Please enter status")
    },
    location:{
        type:String,
    }

}, {versionKey: false})
