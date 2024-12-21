const User=require("../models/user.js");

module.exports.getSignUpForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signUpUser=async(req,res)=>{
    try{
        let {username, email, password}=req.body;
        let newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success","Successfully registered!  Welcome to WanderDost!");
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.getLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.loginUser=async(req,res)=>{
    req.flash("success","Welcome Back to WanderDost!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logOutUser=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You've been logged out successfully!");
        res.redirect("/listings");
    });
}