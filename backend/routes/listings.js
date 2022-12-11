const express = require('express');

const Listing = require('../models/listing');

const router = express.Router();

router.post('', (req, res, next) => {
  const listing = new Listing({
    title: req.body.title,
    content: req.body.content,
  });
  listing.save(); // Maybe post.save
  res.status(201).json({
    message: 'Listing added successfully',
  });
});

router.put('/:id', (req, res, next) => {
  const listing = new Listing({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Listing.updateOne({ _id: req.params.id }, listing).then((result) => {
    console.log(result);
    res.status(200).json({ message: 'Updated listing!' });
  });
});

router.get('', (req, res, next) => {
  Listing.find().then((documents) => {
    res.status(200).json({
      message: 'Listings fetched successfully!',
      listings: documents,
    });
  });
});

router.get('/:id', (req, res, next) => {
  Listing.findById(req.params.id).then((listing) => {
    if (listing) {
      res.status(200).json(listing);
    } else {
      res.status(404).json({ message: 'Listing not found.' });
    }
  });
});

router.delete('/:id', (req, res, next) => {
  Listing.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: 'Listing deleted!' });
  });
});

module.exports = router;
