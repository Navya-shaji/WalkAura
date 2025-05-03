const User=require("../../Models/userSchema")

const LoadHomePage=async(req,res)=>{

try {
   return  res.render("Home")
} catch (error) {
    console.log(error)
    res.status(500).send("server error")
}
}

const LoadSignupPage=async(req,res)=>{
    try {
        return res.render("signup")
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}

const signUp=async(req,res)=>{
    const {name,email,phone,password}=req.body
    try {
        const newUser=new User({name,email,phone,password})
         await newUser.save()
         console.log(newUser)
        return res.redirect("/signup")
    } catch (error) {
        console.error(error)
        res.status(500).send(" Internal Server error")
    }
}


const PageNotFound=async(req,res)=>{
    try {
        res.render("PageNotFound");
    } catch (error) {
        res.redirect('/PageNotFound')
    }
}

module.exports={
    LoadHomePage,
    PageNotFound,
    LoadSignupPage,
    signUp
}