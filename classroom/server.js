
const express = require("express"); 
const app = express(); 
const users = require("./routes/user.js"); 
const posts = require("./routes/post.js"); 
// const cookieParser = require("cookie-parser");
const session = require("express-session"); 
const flash = require("connect-flash"); 
const path = require("path");



app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views"));


// app.use(cookieParser("secretcode"));    // its signed and verify

// // ---------- for signedCookie
// app.get("/getsignedcookie", (req, res) => {
//   res.cookie("user", "Raja", {signed: true}); 
//   res.send("signed cookie sent");
// }); 

// // --------- for verify 
// app.get("/verify", (req, res) => {
//   console.log(req.signedCookies); 
//   res.send("verified");
// });

// // send cookies ----------------- 
// app.get("/getcookies", (req, res) => {
//   res.cookie("greet", "hellojii");  
//   res.cookie("gray", "kya hal hai");
//   res.cookie("madeIn", "India"); 
//   res.send("send you some cookies");
// }); 

// app.get("/deletecookie", (req, res) => {
//   res.clearCookie("madeIn"); // deletes the "greet" cookie
//   res.send("Cookies deleted!");
// });


// // read cookies ------------------ 

// app.get("/greet", (req, res) => {
//   let {name = "anonymous"} = req.cookies; 
//   res.send(`Hii, ${name}`);
// })


// app.get("/", (req, res) => {
//   console.dir(req.cookies);     // ----- for read cookies
//   res.send("Hii, I am root");
// });
 
// app.use("/users", users);
// app.use("/posts", posts); 

// ======================================================================= 

// Express session ---------- 

 const sessionOptions = {
  secret: "mysupersecretstring", 
  resave: false, 
  saveUninitialized: true,
 }; 

app.use(session(sessionOptions)); 
app.use(flash()); 

app.get("/register", (req, res) => {
  let { name = "kuchh bhi "} = req.query;
  req.session.name = name; 
  
  if(name === "anonymous") {
    req.flash("success", "user  not registered ");
  } else {
    req.flash("error", "user registered successfully");
  }
    res.redirect("/helloji");
});


app.get("/helloji", (req, res) => {
  res.locals.messages = req.flash("success");
   res.render("page.ejs", { name: req.session.name });
});




// app.get("/reqcount", (req, res) => {
//   if( req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }
//    res.send(`You sent a request ${req.session.count} times`);
// });

// app.get("/test", (req, res) => {
//   res.send("test successfully!");
// }); 


app.listen(3000, () => {
  console.log("server is listening to 3000"); 
} ); 


 
