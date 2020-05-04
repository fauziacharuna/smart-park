const Record = require('../model/Records')

var vehicleIn = {}

var vehicleOut = {}
var capacity = {}
var vehicleCounter = {}

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
        for(var i in vehicle){
            if(vehicle[i]._id.status=='masuk'){
                if(vehicleCounter.hasOwnProperty(vehicle[i]._id.location)){
                    vehicleCounter[vehicle[i]._id.location] += vehicle[i].jumlah_kendaraan
                }else{
                    vehicleCounter[vehicle[i]._id.location] = vehicle[i].jumlah_kendaraan
                }

            }else if(vehicle[i]._id.status=='keluar'){
                if(vehicleCounter.hasOwnProperty(vehicle[i]._id.location)){
                    vehicleCounter[vehicle[i]._id.location] -= vehicle[i].jumlah_kendaraan
                }else{
                    vehicleCounter[vehicle[i]._id.location] = 0 - vehicle[i].jumlah_kendaraan
                }
           }
        }
     
        res.status(200).json({
            success: true,
            vehicle_counter : vehicleCounter
        }) 
        console.log(vehicleCounter)
      
    }catch (err){
        res.status(400).json({
            success: false
        })
    }
    // console.log(global.vehicleIn = vehicleCounter)
}


