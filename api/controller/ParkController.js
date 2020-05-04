const Park = require('../model/Parks')
const Record = require('../model/Records')
var capacity = {}
var vehicleCounter = {}
var slot = {}
var key = []

exports.getSlot = async (req, res, next) => {
    try{
        // console.log(vehicleCalc)
        // console.log(vehicleCount)
        vehicleCounter, capacity = {}
        const cap = await Park.find()
        for(var i in cap){
            
            capacity[cap[i]._id] = cap[i].capacity
            // capacity[cap[i]._id] = ca[i].slot
        }
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
        for(var i in cap){    
            slot[cap[i]._id] = capacity[cap[i]._id] - vehicleCounter[vehicle[i]._id.location]    
            // key[i] = cap[i]._id
            // if(capacity[cap[i]._id].has(key[i]) && vehicleCounter[vehicle[i]._id.location].has(key[i])) {
            //     slot[i] = capacity[cap[i]._id] - vehicleCounter[vehicle[i]._id.location]
            // }
        }
 
        // console.log(key)

        // console.log(vehicleCounter[vehicle[0]._id.location])
        // console.log(capacity['5eaefa6598982f1f2c7daf41'])
        
        // console.log(capacity[cap[0]._id] - vehicleCounter[vehicle[0]._id.location])
        // console.log(slot)
        // console.log(vehicleCounter)
        res.status(200).json({
            success: true,
            slot: slot
        })
        console.log(slot)
        // console.log(vehicleCounter)
        // console.log(capacity['5eaefa6598982f1f2c7daf41'])    
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