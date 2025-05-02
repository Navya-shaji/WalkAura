const express = require('express');
const router = express.Router(); 
const userController=require('../Controller/user/userController')

router.get('/',userController.LoadHomePage)
router.get("/pageNotFound",userController.PageNotFound)

module.exports=router