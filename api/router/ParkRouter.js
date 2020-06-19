const express = require('express')
const dotenv = require('dotenv')
const { createRecord, getCountVehicle, listRecords} = require('../controller/RecordController')
const {getParks,  createPark, getSlot,getPark} = require('../controller/ParkController')


const router = express.Router()
// router.route('/')
// .get
router.route('/')
    .get(listRecords)
    .post(createRecord)
router.route('/vehicle')
    .get(getCountVehicle)
// router.route('/park')
router.route('/park')
    .get(getParks)
    .post(createPark)
router.route('/park/:id')
    .get(getPark)

// router.route('/park/:id')
//     .get(getPark)
router.route('/slot')
    .get(getSlot)




// router.route('/:id')
    // .put(updateRecord)
    // .delete(deleteRecord)


module.exports = router 