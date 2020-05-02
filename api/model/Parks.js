const mongoose = require('mongoose')

const parks = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please insert park name']
    },
    capacity:{
        type: Number,
        required: true
    }

},{versionKey: false})
module.exports = mongoose.model('parks', parks)