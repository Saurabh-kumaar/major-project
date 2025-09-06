hn
const express = require("express"); 
const app = express(); 
const mongoose = require("mongoose"); 
const Listing = require("./models/listing.js");
const path = require("path"); 
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js"); 
const { wrap } = require("module");
const { listingSchema } = require("./schema.js");

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


app.get("/", (req, res) => {
  res.send("Hii, I am root"); 
}); 


const validateListing = (req, res, next) => {
  let { error }= listingSchema.validate(req.body); 
  if(error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next(); 
  }
}; 


// index Route 
app.get(
  "/listings",  wrapAsync(async (req, res) => {
  const allListings = await Listing.find({}); 
  res.render("listings/index.ejs", {allListings}); 
})); 



// New Route 
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});



// Show & Read Route 
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params; 
  const listing = await Listing.findById(id); 
  res.render("listings/show.ejs", {listing}); 
}); 

// Create Route 
app.post(
  "/listings", 
  validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing); 
    await newListing.save(); 
    res.redirect("/listings"); 
  })
);


// Edit Route 
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params; 
  const listing = await Listing.findById(id); 
  res.render("listings/edit.ejs", { listing }); 
})); 


// update Route 
app.put(
  "/listings/:id",  
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params; 
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }); 
    res.redirect(`/listings/${id}`); 
})); 


// Delete Route 
app.delete(
  "/listings/:id",  
  wrapAsync(async (req, res) => {
  let { id } = req.params; 
  let deletedListing = await Listing.findByIdAndDelete(id); 
  console.log(deletedListing); 
  res.redirect("/listings"); 
}));
daf 
qer 
// it is for all error-----------------------------------------------------------------------
app.use((req, res, next) => {                       // || app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"))   // ||  next (new ExpressError(404, "page not found"))})
});


adlfkj
// middleware for error handling 
app.use((err, req, res, next) => {
  const {statusCode = 500, message = "something went wrong"} = err;
  res.status(statusCode).render("error.ejs", { message }); 
  // res.status(statusCode).send(message);
 }); 



app.listen(8080, () => {
  console.log("server is listening to port 8080"); 
}); 







