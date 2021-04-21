const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = express.Router();

const users = require("./users.js");
// const User = users.model;
const validAdmin = users.validAdmin;

//GENRE: Schema, Model, POST, GET, UPDATE, DELETE
const genreSchema = new mongoose.Schema({
    name: String
});

//genre model
const Genre = mongoose.model('Genre', genreSchema);

//create a genre
router.post('/', validAdmin, async(req, res) => {
    const genre = new Genre ({
        name: req.body.name,
    });
    try {
        await genre.save();
        res.send(genre);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//get all the genres
router.get('/', async(req, res) => {
    try {
        let genres = await Genre.find();
        res.send(genres);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//update a genre
router.put('/:genreID', validAdmin, async(req, res) => {
    try {
        let genre = await Genre.findOne({_id: req.params.genreID});
        if(!genre) {
            res.sendStatus(404);
            return;
        }
        genre.name = req.body.name;
        await genre.save();
        res.send(genre);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//delete a genre
router.delete('/:genreID', validAdmin, async(req, res) => {
    try {
        let genre = await Genre.findOne({_id: req.params.genreID});
        if(!genre) {
            res.sendStatus(404);
            return;
        }
        await genre.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    model: Genre,
    routes: router,
}