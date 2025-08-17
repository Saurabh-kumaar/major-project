
const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const listingSchema = new Schema({
  title: {
    type: String, 
    required: true, 
  },
  description: String, 
  image: {
      type: String, 
      default: 
        "https://unsplash.com/photos/a-patio-with-tables-and-chairs-tgp5RtxfHIQ",
      set: (v) => 
        v === ""
          ?"https://unsplash.com/photos/a-patio-with-tables-and-chairs-tgp5RtxfHIQ"
          : v, // it is set for client
  },
  price: Number, 
  location: String, 
  country: String, 

}); 


const Listing = mongoose.model("Listing", listingSchema); 
module.exports = Listing; 












