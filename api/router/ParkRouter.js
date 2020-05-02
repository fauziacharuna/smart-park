const express = require('express')
const dotenv = require('dotenv')
const {getRecords, createRecord, getCountVehicle, getParks, createPark,getSlot } = require('../controller/RecordController')


const router = express.Router()
// router.route('/')
// .get
router.route('/')
    .get(getRecords)
    .post(createRecord)
router.route('/vehicle')
    .get(getCountVehicle)
// router.route('/park')
router.route('/park')
    .get(getParks)
    .post(createPark)
router.route('/slot')
    .get(getSlot)

// router.route('/:id')
    // .put(updateRecord)
    // .delete(deleteRecord)


module.exports = router 