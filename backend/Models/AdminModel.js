const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt")

const adminSchema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
})




module.exports=mongoose.model("Admin",adminSchema)