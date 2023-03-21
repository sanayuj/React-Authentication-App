const UserModel = require("../Models/UserModel")
const jwt = require('jsonwebtoken')
const maxAge = 3 * 24 * 60 * 60;

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

module.exports.signup = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;
        const user = await UserModel.create({ name, email, password });
        const token = createToken(user._id)
        res.status(201).json({ user: user._id, created: true })
    } catch (error) {
        const errors = handleErrors(error)
        res.json({ errors, created: false })
    }

};
module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.login(email, password);
        const token = createToken(user._id)
        res.cookie("jwt", token, {
            withcrdentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000
        })
        res.status(200).json({ user: user._id, created: true, jwt: token })
    } catch (error) {
        const errors = handleErrors(error)
        res.json({ errors, created: false })
    }

};

module.exports.uploadImage = async (req, res, next) => {
    const token = req.cookies.jwt;

    jwt.verify(token, "secret-key", async (err, decodedToken) => {
        if (err) {
            res.json({ status: false });
            next()
        } else {
            try{
            const user = await UserModel.findById(decodedToken.id);
            if (user) {
                user.imageUrl = `images/${req.file.filename}`;
                const updatedUser = await user.save();
                res.json({status:true,username:user.name,useremail:user.email,userid:user._id,image:user.imageUrl})
            } else {
                res.json({ status: false })
                next();
            }
        }catch(error){
        }
    }
    })

}
