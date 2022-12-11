const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model('Listing', listingSchema);
