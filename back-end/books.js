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
const genres = require("./genres.js");
const User = users.model;
const validAdmin = users.validAdmin;
const validUser = users.valid;
const Genre = genres.model;

//BOOK: Schema, Model, POST, GET for genre, UPDATE
const bookSchema = new mongoose.Schema({
    genre: {
        type: mongoose.Schema.ObjectId,
        ref: 'Genre'
    },
    name: String,
    description: String,
    photoPath: String,
    author: String,
});

//book model
const Book = mongoose.model('Book', bookSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
router.post('/photos', validAdmin, upload.single('photo'), async (req, res) => {
    // Just a safety check
    if (!req.file) {
      return res.sendStatus(400);
    }
    res.send({
      photoPath: "/images/" + req.file.filename
    });
  });

//Create a Book w/ Genre
router.post('/:genreID', validAdmin, async(req, res) => {
        try {
        let genre = await Genre.findOne({_id: req.params.genreID});
        if (!genre) {
            res.sendStatus(404);
            return;
        }
        let book = new Book ({
            genre: genre,
            name: req.body.name,
            description: req.body.description,
            photoPath: req.body.photoPath,
            author: req.body.author,
        });
        await book.save();
        res.send(book);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Get all the books in the database
router.get('/', async(req, res) => {
    try {
        let books = await Book.find().populate('genre');
        res.send(books);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Get all the books for a genre 
router.get('/genre/:genreID', async(req, res) => {
    try {
        let genre = await Genre.findOne({_id: req.params.genreID});
        if (!genre) {
            res.sendStatus(404);
            return;
        }
        let books = await Book.find({genre:genre}).populate('genre');
        res.send(books);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Get a single book
router.get('/book/:bookID', async(req, res) => {
    try {
        let book = await Book.findOne({
            _id: req.params.bookID
        }).populate('user').populate('genre');
        if (!book) {
            res.sendStatus(404);
            return;
        } 
        res.send(book);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

//Update a book
router.put('/:bookID', validAdmin, async(req, res) => {
        try {
        let book = await Book.findOne({_id: req.params.bookID});
        if(!book) {
            res.sendStatus(404);
            return;
        }
        book.name = req.body.name;
        book.description = req.body.description;
        book.author = req.body.author;
        //photoPath = req.body.photoPath;
        await book.save();
        res.send(book);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Delete a book
router.delete('/:bookID', validAdmin, async(req, res) => {
        try {
        let book = await Book.findOne({_id: req.params.bookID});
        if(!book) {
            res.sendStatus(404);
            return;
        }
        await book.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    } 
});

module.exports = {
    model: Book,
    routes: router
}