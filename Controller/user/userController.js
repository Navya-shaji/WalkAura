const User = require("../../Models/userSchema")
const nodemailer = require('nodemailer')
const env = require('dotenv').config()

const LoadHomePage = async (req, res) => {

    try {
        return res.render("Home")
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}

const LoadSignupPage = async (req, res) => {
    try {
        return res.render("signup")
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}


function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}
async function sendVerificationEmail(email, otp) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            requireTLs: true,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        })

        const info = await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: "verify your account",
            text: `your OTP is ${otp}`,
            html: `<b>Your OTP :${otp} </b>`,
        })
        return info.accepted.length > 0

    } catch (error) {
        console.error("Error sending email", error);
        return false;
    }
}

const signUp = async (req, res) => {
    try {

        const { email, password, confirmPassword } = req.body
        if (password !== confirmPassword) {
         return   res.render('signup', { messege: "Passwords are not match" })
        }
        const findUser = await User.findOne({ email: req.body.email });
        if (findUser) {
          return   res.render('signup', { messege: "User already exist" })
        }
        const otp = generateOtp()
        const emailSent = await sendVerificationEmail(email, otp)
        if (!emailSent) {
            return res.render('signup', { message: "Failed to send OTP. Please try again." });
        }
        req.session.userOtp = otp;
        req.session.userdata = { email, password }
        console.log("OTP", otp)
        return res.render("verify-otp")
    } catch (error) {
        console.error("Signup error", error)
         res.redirect("/pageNotFound")
    }
}

const verifyOtp=async(req,res)=>{
 try {
    const {otp}=req.body
    const sessionOtp=req.session.userOtp
    if(otp==sessionOtp){
       const {email,password}= req.session.userdata 
       const newUser=new User( {email,password})
       await newUser.save()
        req.session.userOtp=null;
        req.session.userdata =null;
        return res.render("Login",{messege:"Please Login Now "})
    }else{
        return res.render("verify-otp",{messege:"Incorrect otp"})
    }
 } catch (error) {
    console.error(error)
    res.redirect('/PageNotFound')
 }
}

const PageNotFound = async (req, res) => {
    try {
        res.render("PageNotFound");
    } catch (error) {
        res.redirect('/PageNotFound')
    }
}

module.exports = {
    LoadHomePage,
    PageNotFound,
    LoadSignupPage,
    signUp,
    verifyOtp
}