const Park = require('../model/Parks')
const Record = require('../model/Records')
var capacity = {}
var vehicleCounter = {}
var slot = {}


exports.getSlot = async (req, res, next) => {

    try{
        const cap = await Park.find()
        for(var i in cap){   
            capacity[cap[i]._id] = cap[i].capacity
        }
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
        for(var i in cap){    
            slot[cap[i]._id] = capacity[cap[i]._id] - vehicleCounter[vehicle[i]._id.location]    
            
        }
       
        res.status(200).json({
            success: true,
            slot: slot
        }) 
        console.log(slot)
    }catch(err){
        res.status(400).json({
            success: false
        })
    }
}
exports.getParks = async (req, res, next)=>{
    try{
        const cap = await Park.find()
        for(var i in cap){   
            capacity[cap[i]._id] = cap[i].capacity
        }
        // console.log(cap)
      
        // const parks = await Park.find()
        res.status(200).json({
            success: true,
            data: capacity
        })
        console.log(capacity)
        // console.log(parks)
       

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