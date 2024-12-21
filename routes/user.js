const express=require("express");
const wrapAsync = require("../utils/wrapAsync");
const router=express.Router();
const ExpressError=require("../utils/ExpressError.js");
const User=require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");

const userController=require("../controller/user.js");

router.route("/signup")
    .get(userController.getSignUpForm)
    .post(wrapAsync(userController.signUpUser));

router.route("/login")
    .get(userController.getLoginForm)
    .post(saveRedirectUrl,
        passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
        userController.loginUser);

//Logout route
router.get("/logout",userController.logOutUser);

module.exports = router;