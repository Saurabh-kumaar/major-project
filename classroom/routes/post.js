const express = require("express"); 
const router = express.Router(); 


// ----------- POST  ----------------- 
// Index -- users 
router.get("/posts", (req, res) => {
  res.send("GET for posts id");
}); 

// show -- users 
router.get("/posts/:id", (req, res) => {
  res.send("GET for posts id"); 
}); 

// post -- users 
router.post("/posts", (req, res) => {
  res.send("POST for posts id");
}); 

// delete -- users 
router.delete("/posts./:id", (req, res) => {
  res.send("DELETE for post id");
});

module.exports = router; 



