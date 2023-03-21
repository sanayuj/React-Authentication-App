const mongoose = require("mongoose")
mongoose.set('strictQuery', true)

module.exports = {

    dbConnect: async () => {
        const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/authenticationapp"
        try {
            await mongoose.connect(uri).then(() => {
                console.log("db connected succefully")
            })
        } catch (err) {
            console.log(err)
        }
    },


}