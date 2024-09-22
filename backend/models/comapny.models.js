const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    location:{
        type:String
    },
    logo:{
        type:String//URL to enter later using cloudinary and fetch data from there
    },
    website:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

},{timestamps:true})

const Company = mongoose.model('Company', companySchema)
module.exports = {Company};