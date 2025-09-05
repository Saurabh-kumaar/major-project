const express = require("express");
const app = express(); 
const users = require("./routes/user.js"); 
const posts = require("./routes/post.js");


app.get("/", (req, res) => {
  res.send("Hii, i am root 2!");
});

app.use("/users", users);
app.use("/posts", posts); 
 
 

app.listen(3000, () => {
  console.log("server is listening on 3000");
});














