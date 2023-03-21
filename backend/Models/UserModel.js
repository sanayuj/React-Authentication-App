const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Required"]
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
    },
    imageUrl:{
        type:String
    }
})

userSchema.pre('save',async function (next){
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    const salt=await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userSchema.statics.login=async function(email,password){
    const user =await this.findOne({email});
    if(user){
        const auth=await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }else{
            throw Error("Incorrect password")
        }
    }else{
        throw Error("Incorrect Email")
    }
}

module.exports=mongoose.model("Users",userSchema)