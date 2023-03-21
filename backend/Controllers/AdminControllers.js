
const User = require("../Models/UserModel")
const Admin = require("../Models/AdminModel")
const jwt = require('jsonwebtoken')
const maxAge = 3 * 24 * 60 * 60;
const bcrypt = require("bcrypt");
const { findOneAndUpdate } = require("../Models/UserModel");


const createToken = (id) => {
    return jwt.sign({ id }, "secret-key", {
        expiresIn: maxAge
    })
}
const handleErrors = (err) => {
    let errors = { name: "", email: "", password: "" }

    if (err.message === "Incorrect Email") {
        errors.email = "That email is not registerd"
    }
    if (err.message === "Incorrect password") {
        errors.password = "That Password is incorrect"
    }

    if (err.code === 11000) {
        errors.email = "Email is already registered"
        return errors;
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;

}

const adminlogin=async function(email,password){
    const admin =await Admin.findOne({email});
    if(admin){
        const auth=await bcrypt.compare(password,admin.password);
        if(auth){
            return admin;
        }else{
            throw Error("Incorrect password")
        }
    }else{
        throw Error("Incorrect Email")
    }
}

module.exports.AdminLogin = async(req,res,next)=>{
  try {
    const {email,password} = req.body;
    const admin = await adminlogin(email,password)
    const token = createToken(admin._id)
    res.cookie("admin_jwt", token, {
        withcrdentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000
    })
    res.status(200).json({ created: true, jwt: token })
  } catch (error) {
    const errors = handleErrors(error)
    res.json({ errors, created: false })
  }
}


module.exports.home = async(req,res,next)=>{
    try {
    const token = req.cookies.admin_jwt;
    
        if(token){
            jwt.verify(token,"secret-key",async (err,decodedToken)=>{
                if(err){
                  res.json({status:false});
                  next() 
                }else{
                    const usersData = await User.find({})
                    if(usersData){
                        res.status(201).json({status:true,usersData})
                        next();
                    }else{
                        res.json({status:false})
                        next();
                    }
                 
                }
                })
            }
       
    } catch (error) {
        res.status(422).json({error})
        next()
    }
}

module.exports.addUser = async(req,res,next)=>{
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            res.json({status:false,error:"All fields are required"})
        }
        const preUser = await User.findOne({email:email})
        if(preUser){
            res.json({status:false,error:"This email is already exist"})
        }else{
            const addUser = new User({
                name,email,password
            })
            await addUser.save()
            res.status(201).json({status:true,message:"User succesfully added"})
        }
    } catch (error) {
        console.log(error);
    }
  
}

module.exports.deleteUser=async(req,res,next)=>{
    try {
        const id =req.params.id  
        const deleteUser = await User.findOneAndDelete({_id:id})
        res.status(201).json(deleteUser)

    } catch (error) {
        res.status(422).json(error)
    }
}

module.exports.editUser = async(req,res,next)=>{
    try {
        const {id,name,email} = req.body
        const userdata = await User.findOneAndUpdate({_id:id},{$set:{
            name:name,
            email:email
        }}).then(()=>{
            res.status(201).json({status:true,message:"User data edited"})
        })
    } catch (error) {
        console.log(error);
    }
}

