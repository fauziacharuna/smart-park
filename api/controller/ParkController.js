const Park = require('../model/Parks')
const Record = require('../model/Records')
var dataLoc ={}


exports.getSlot = async (req, res, next) => {
var capacity = {}
var vehicleCounter = {}
var slot = {}
    try{
        const cap = await Park.find()
        for(var i in cap){   
            capacity[cap[i]._id] = cap[i].capacity
        }
        // console.log(capacity)
        const vehicle = await Record.aggregate([{"$group" :{_id:{status:"$status", location:"$location"}, jumlah_kendaraan:{$sum:1}}}])
        for(var i in vehicle){
        
            if(vehicle[i]._id.status=='masuk'){
                if(vehicleCounter.hasOwnProperty(vehicle[i]._id.location) && vehicle[i]._id.location != 0){
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
        // console.log(vehicle[0])
        // console.log(vehicle[1]
        // console.log(vehicleCounter['5eaced823cc8990f32ce40fb'])
        // console.log(vehicleCounter[vehicle[0]._id.location])
        for(var i in cap){    
            slot[cap[i]._id] = capacity[cap[i]._id] - vehicleCounter[cap[i]._id]     
        }
        for(var i in cap ){
            dataLoc.kapasitas = capacity[cap[i]._id];
            dataLoc.jumlahKendaraan = vehicleCounter[cap[i]._id];
            dataLoc.slot = slot[cap[i]._id];

        }
        console.log(dataLoc)
        res.status(200).json({
            success: true,
            slot: slot
        }) 
        // console.log(cap)
        // console.log(capacity)
        // console.log(vehicle)
        // console.log(vehicleCounter)
        // console.log(slot)
        // console.log(slot)
    }catch(err){
        res.status(400).json({
            success: false
        })
    }
}
exports.getParks = async (req, res, next)=>{
    try{
        const cap = await Park.find()   
        res.status(200).json({
            success: true,
            data: cap
        })
        console.log(cap)
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
