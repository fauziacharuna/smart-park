const express = require('express')
const dotenv = require('dotenv')
const {getRecords, updateRecord, createRecord, deleteRecord} = require('../controller/ParkController')


const router = express.Router()
router.route('/')
    .get(getRecords)
    .post(createRecord)
router.route('/:id')
    .put(updateRecord)
    .delete(deleteRecord)


module.exports = router 