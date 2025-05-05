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

        const { email, password, confirmpassword } = req.body
        if (password !== confirmpassword) {
            res.render('signup', { messege: "Passwords are not match" })
        }
        const findUser = await User.findOne({ email: req.body.email });
        if (findUser) {
            res.render('signup', { messege: "User already exist" })
        }
        const otp = generateOtp()
        const emailSent = await sendVerificationEmail(email, otp)
        if (!emailSent) {
            return res.json('email-error')
        }
        req.session.userOtp = otp;
        req.session.userdata = { email, password }
        // res.render("verify-otp")
        console.log("OTP", otp)
    } catch (error) {
        console.error("Signup error", error)
        res.redirect("/pageNotFound")
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
    signUp
}