

const express = require("express"); 
const app = express(); 
const mongoose = require("mongoose"); 
// const Listing = require("./models/listing.js");
const path = require("path"); 
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js"); 
// const { wrap } = require("module");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport"); 
const LocalStrategy = require("passport-local"); 
const User = require("./models/user.js"); 


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js"); 

 
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; 

main()
  .then( () => {
    console.log("connected to DB"); 
  })
  .catch((err) => {
    console.log(err); 
  });

// --- create database 
async function main() {
  await mongoose.connect(MONGO_URL); 
}

app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views")); 
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json()); // for JSON data
app.use(methodOverride("_method")); 
app.engine('ejs', ejsMate); 
app.use(express.static(path.join(__dirname, "/public")));


const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false, 
  saveUninitialized: true,
  cookie : {
    express: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
}

app.get("/", (req, res) => {
  res.send("Hii, I am root"); 
}); 

app.use(session(sessionOptions));
app.use(flash());  

app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));      // for login and signup 


passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");  
  res.locals.currUser = req.user;
  next(); 
});

//demo signup
// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com", 
//     username: "delta-student",
//   }); 

//   let registerUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser); 
// });


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter); 


// it is for all error-----------------------------------------------------------------------
app.use((req, res, next) => {                       // || app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"))   // ||  next (new ExpressError(404, "page not found"))})
});

 
// middleware for error handling 
app.use((err, req, res, next) => {
  const {statusCode = 500, message = "something went wrong"} = err;
  res.status(statusCode).render("error.ejs", { message }); 
  // res.status(statusCode).send(message);
 }); 


app.listen(8080, () => {
  console.log("server is listening to port 8080"); 
}); 


