const Record = require('../model/Records')
const Park = require('../model/Parks')

exports.createRecord = async (req, res, next) =>{
    const record = await Record.create(req.body)
    res.status(201).json({
        success: true,
        data: record
    })
    console.log(record)
}
exports.getRecords = async(req, res, next) =>{
    try{
        const records = await Record
        .find()
        // .populate({path:'location', match: {x:1}, select:'status time location'})
        // .select('status time location')
        // const records = await Record.find(query).populate('location')
        // populate('location', 'name capacity -_id').select('status time location')
        res.status(200).json({
            success: true,
            data: records
        })
        console.log(records)

    }catch (err){
        res.status(400).json({success: false})

    }
}
exports.getCountVehicle = async (req, res, next) =>{
    try{
        const vehicle = await Record.aggregate([{"$group" :{_id:{status:"$status", location:"$location"}, jumlah_kendaraan:{$sum:1}}}])
        res.status(200).json({
            success: true,
            data : vehicle
        })
        console.log(vehicle)

    }catch (err){
        res.status(400).json({
            success: false
        })
    }
}
exports.getParks = async (req, res, next)=>{
    try{
        const parks = await Park.find()
        res.status(200).json({
            success: true,
            data: parks
        })
        console.log(parks)

    }catch (err){
        res.status(400).json({
            success: false
        })

    }
}
exports.createPark = async (req, res, next) =>{
    const park = await Park.create(req.body)
    res.status(200).json({
        success: true,
        data: park
    })
    console.log(park)
}