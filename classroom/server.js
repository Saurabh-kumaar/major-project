
const express = require("express"); 
const app = express(); 
const users = require("./routes/user.js"); 
const posts = require("./routes/post.js"); 
const cookieParser = require("cookie-parser");

app.use(cookieParser("secretcode"));    // its signed and verify

// ---------- for signedCookie
app.get("/getsignedcookie", (req, res) => {
  res.cookie("user", "Raja", {signed: true}); 
  res.send("signed cookie sent");
}); 

// --------- for verify 
app.get("/verify", (req, res) => {
  console.log(req.signedCookies); 
  res.send("verified");
});

// send cookies ----------------- 
app.get("/getcookies", (req, res) => {
  res.cookie("greet", "hellojii");  
  res.cookie("gray", "kya hal hai");
  res.cookie("madeIn", "India"); 
  res.send("send you some cookies");
}); 

app.get("/deletecookie", (req, res) => {
  res.clearCookie("madeIn"); // deletes the "greet" cookie
  res.send("Cookies deleted!");
});


// read cookies ------------------ 

app.get("/greet", (req, res) => {
  let {name = "anonymous"} = req.cookies; 
  res.send(`Hii, ${name}`);
})


app.get("/", (req, res) => {
  console.dir(req.cookies);     // ----- for read cookies
  res.send("Hii, I am root");
});
 
app.use("/users", users);
app.use("/posts", posts); ad

app.listen(3000, () => {
  console.log("server is listening to 3000"); 
} ); 


// ================ 

 
