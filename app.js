
const express = require("express"); 
const app = express(); 
const mongoose = require("mongoose"); 
const Listing = require("./models/listing.js");
const path = require("path"); 
const methodOverride = require("method-override");


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

app.get("/", (req, res) => {
  res.send("Hii, I am root"); 
}); 

// index Route 
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({}); 
  res.render("listings/index.ejs", {allListings}); 
})


// New Route 
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});



// Show & Read Route 
app.get("/listings/:id", async (req, res) => {
  let {id} = req.params; 
  const listing = await Listing.findById(id); 
  res.render("listings/show.ejs", {listing}); 
}); 

// Create Route 
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing); 
  await newListing.save(); 
  res.redirect("/listings"); 
});


// Edit Route 
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params; 
  const listing = await Listing.findById(id); 
  res.render("listings/edit.ejs", { listing }); 
}); 

// update Route 
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params; 
  await Listing.findByIdAndUpdate(id, { ...req.body.listing }); 
  res.redirect(`/listings${id}`); 
}); 

// Delete Route 
app.get("/listings/:id")





// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My new villa",
//     description: "By the beach", 
//     price: 1200, 
//     location: "Calangute, Goa", 
//     country: "India",
//   });

//   await sampleListing.save(); 
//   console.log("sample waas saved"); 
//   res.send("successful testing"); 

// });


app.listen(8080, () => {
  console.log("server is listening to port 8080"); 
}); 






