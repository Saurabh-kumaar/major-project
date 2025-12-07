const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
}

module.exports.signup = async(req, res, next) => {
  try { 
    let {username, email, password} = req.body; 
    const newUser = new User({email, username}); 
    const registeredUser = await User.register(newUser, password); 

    console.log(registeredUser); 
    req.login(registeredUser, (err) => {  //-- automatically login when we signup 
      if(err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      return res.redirect("/listings"); 
    });
  } catch(err) {
    req.flash("error", e.message); 
    res.redirect("/signup");
  }
}


module.exports.randerLoginForm = (req, res) => {
  res.render("users/login.ejs");
}


module.exports.login = (req, res) => {
    // res.send("welcome to wanderlust! You are logged in!")
    req.flash("success", "Welcome back to Wanderlust!");

    let redirectUrl = res.locals.redirectUrl || "/listings";
    // delete req.session.redirectUrl; 
    return res.redirect(redirectUrl);
  };
  


module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if(err) {
      return next(err);
    } 
    req.flash("success", "you are logged out"); 
    res.redirect("/listings");
  })
}







