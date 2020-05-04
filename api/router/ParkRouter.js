const express = require('express')
const dotenv = require('dotenv')
const {getAllRecords, createRecord, getCountVehicle} = require('../controller/RecordController')
const {getParks, createPark, getSlot} = require('../controller/ParkController')


const router = express.Router()
// router.route('/')
// .get
router.route('/')
    .get(getAllRecords)
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