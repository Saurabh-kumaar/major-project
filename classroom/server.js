const express = require("express");
const app = express(); 


app.get("/", (req, res) => {
  res.send("Hii, i am root 2!");
});

// Index -- users 
app.get("/users", (req, res) => {
  res.send("GET for users");
}); 

// show -- users 
app.get("/users/:id", (req, res) => {
  res.send("GET for show user id"); 
}); 

// post -- users 
app.post("/users", (req, res) => {
  res.send("POST for users id");
}); 

// delete -- users 
app.delete("/users./:id", (req, res) => {
  res.send("DELETE for user id");
})

app.listen(3000, () => {
  console.log("server is listening on 3000");
});














