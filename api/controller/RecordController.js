const Record = require('../model/Records')
const Park = require('../model/Parks')

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
        // for(var i in vehicle){
        //     if(vehicle[i]._id.status == 'masuk'){
        //         vehicleIn[vehicle[i]._id.location] = vehicle[i].jumlah_kendaraan
        //     }else if(vehicle[i]._id.status =='keluar'){
        //         vehicleOut[vehicle[i]._id.location] = vehicle[i].jumlah_kendaraan
        //     }
        // }
        res.status(200).json({
            success: true,
            vehicle_counter : vehicleCounter
        }) 
        app.locals.vehicle_counter = vehicleCounter
        // console.log(vehicleCounter[vehicle[1]._id.location])
        // vehicleCalc = vehicleCounter 
        // console.log(vehicleCalc)
        //   this.calculate()

        // console.log(vehicleCounter)
    }catch (err){
        res.status(400).json({
            success: false
        })
    }
    // console.log(global.vehicleIn = vehicleCounter)
}
exports.getSlot = async (req, res, next) => {
    try{
        console.log(vehicleCounter)
        // console.log(vehicleCalc)
        // console.log(vehicleCount)
        const cap = await Park.find()
        for(var i in cap){
            capacity[cap[i]._id] = cap[i].capacity
        }
        // console.log(vehicleCounter)
        res.status(200).json({
            success: true,
            data: capacity
        })
        console.log(capacity)    
    }catch(err){
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
// exports.getSlot = async (req, res, next) =>{
//     var slot = []
//     console.log(capacity)
//     for(var i in slot){
//         slot[i] = capacity[i] - vehicleCounter[i]
//     }
//     var getSlot = await slot
//     res.status(200).json({
//         success: true,
//         data: getSlot
//     })
// }