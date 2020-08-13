const Park = require('../model/Parks')
const Record = require('../model/Records')

exports.getSlot = async (req, res, next) => {
var capacity = {}
var vehicleCounter = {}
var slot = {}
var dataSlot=[]
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
            if(vehicleCounter[cap[i]._id]<=capacity[cap[i]._id]) {
                slot[cap[i]._id] = capacity[cap[i]._id] - vehicleCounter[cap[i]._id]     
            } else{
                console.log("slot is full")
            }
        }
       
        for(var i in cap ){
        locName = cap[i].name
           cap[i]._id === cap[i]._id?
            dataSlot.push({
                // location: cap[i]._id,
                location: locName,
                kapasitas: capacity[cap[i]._id],
                jumlahKendaraan: vehicleCounter[cap[i]._id],
                slot: slot[cap[i]._id],
            }) :
            dataSlot.push({
                location: 0,
                kapasitas: 0,
                jumlahKendaraan: 0,
                slot: 0,
            })
        }    
        res.status(200).json({
            success: true,
            data: dataSlot
        }) 
        console.log(dataSlot)
    }catch(err){
        res.status(400).json({
            success: false
        })
    }
}
exports.getParks = async (req, res, next) =>{
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
exports.getPark = async(req, res, next)=>{
    try{
        const park = await Park.findById(req.params.id)
        res.status(200).json({
            success: true,
            data: park
        })
        console.log(park)

    }catch(err){
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
