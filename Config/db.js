const mongoose=require('mongoose')
const Dotenv=require('dotenv').config()

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB Connected")
    } catch (error) {
        process.exit(1);
    }
}

module.exports=connectDB