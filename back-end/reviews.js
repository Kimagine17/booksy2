const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = express.Router();

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const books = require("./books.js");
const Book = books.model;

//All the review stuff
const reviewSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    review: String,
    //TO-DO: photo: String,
});

//review model
const Review = mongoose.model('Review', reviewSchema);

// router.post('/:bookID/', validUser, async(req, res) => {
router.post('/:bookID/', async(req, res) => {
        try {
        let book = await Book.findOne({_id: req.params.bookID});
        if(!book) {
            res.sendStatus(404);
            return;
        }
        let review = new Review ({
            book: book,
            user: req.user,
            review: req.body.review,
        });
        await review.save();
        res.send(review);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Get all the reviews
router.get('/', async(req, res) => {
    try {
        let reviews = await Review.find();
        res.send(reviews);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Get the reviews for a BOOK
router.get('/:bookID', async(req, res) => {
    try {
        let book = await Book.findOne({_id: req.params.bookID});
        if(!book) {
            res.sendStatus(404);
            return;
        }
        let reviews = await Review.find({book:book});
        res.send(reviews);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Get the reviews for a user
router.get('/', validUser, async(req, res) => {
    try {
        let reviews = await Review.findOne({
            user: req.user
        }).populate('user').sort({
            created: -1
        });
        return res.send(reviews);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Update a review
router.put('/:reviewID', async(req, res) => {
// router.put('/:reviewID', validUser, async(req, res) => {
        try {
        let review = await Review.findOne({_id:req.params.reviewID});
        if(!review) {
            res.sendStatus(404);
            return;
        }
        // if(!(review.user.username === req.user.username))
        // {
        //     res.status(403).send({message:"Comment does not belong to this user"});
        //     return;
        // }
        review.review = req.body.review;
        await review.save();
        res.send(review);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Delete a review
// router.delete('/api/reviews/:reviewID', validUser, async(req, res) => {
router.delete('/:reviewID', async(req, res) => {
    try {
        let review = await Review.findOne({_id:req.params.reviewID});
        if(!review) {
            res.sendStatus(404);
            return;
        }
        await review.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    model: Review,
    routes: router,
}