const express = require('express');
const router = express.Router(); 
const userController=require('../Controller/user/userController')

router.get('/',userController.LoadHomePage)
router.get('/signup',userController.LoadSignupPage)
router.post('/signup',userController.signUp)
router.get("/pageNotFound",userController.PageNotFound)

module.exports=router