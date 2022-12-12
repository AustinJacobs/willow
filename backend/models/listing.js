const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  price: { type: String, required: true },
  address: { type: String, required: true },
  residenceType: { type: String, required: true },
  yearBuilt: { type: String, required: true },
  sqFeet: { type: String, required: true },
  pricePerSqFeet: { type: String, required: true },
});

module.exports = mongoose.model('Listing', listingSchema);
