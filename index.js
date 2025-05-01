const express=require('express')
const app=express()
const Dotenv=require('dotenv').config()
const db=require('./Config/db')
db();
app.listen(process.env.PORT,()=>{
    console.log("server is running  ")
})


module.exports=app