const mongoose = require('mongoose')
const RecordSchema = new mongoose.Schema({
    time:{
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        required: [true,'Please enter status']
    },
    location:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Parks'
    }

}, {versionKey: false})

module.exports = mongoose.model('records', RecordSchema)
