//@desc get all recordd
//@route GET /api/v1/records
//@Access Public
exports.getRecords = (req, res, next)=>{
    res.status(200).json({success: true, msg: 'Show all record'});
}
//@desc Create a record
//@route POST /api/v1/record
//@Access Public
exports.createRecord = (req, res, next)=>{
    res.status(200).json({success: true, msg: 'Create new record'});
}
//@desc Edit a record
//@route PUT /api/v1/record/:id
//@Access Public
exports.updateRecord = (req, res, next)=>{
    res.status(200).json({success: true, msg: `Edit record ${req.params.id}`});
}
//@desc delete a record
//@route DELETE /api/v1/record/:id
//@Access Public
exports.deleteRecord = (req, res, next)=>{
    res.status(200).json({success: true, msg: `Delete a Record ${req.params.id}`});
}


