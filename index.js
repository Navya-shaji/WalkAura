const express=require('express')
const app=express()
const Dotenv=require('dotenv').config()
const db=require('./Config/db')
const path=require('path')
const userRouter=require('./Routes/userRouter')
db();

//Middlewares....
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//ViewEngine.........

app.set("view engine","ejs")
app.set("views", [path.join(__dirname,"views/user"),path.join(__dirname,"view/Admin")])
app.use(express.static(path.join(__dirname, 'public')));

//Routes.........
app.use("/",userRouter)


app.listen(process.env.PORT,()=>{
    console.log("server is running  ")
})



module.exports=app
