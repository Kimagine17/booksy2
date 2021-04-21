const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// setup express
const app = express();

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/booksy2', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  // dest: '../front-end/public/images/',
  dest: '/var/www/booksy2.kimagineland.com/images/',
  limits: {
    fileSize: 10000000
  }
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['secretValue'],
  cookie: {
    maxAge: 24*60*60*1000 //24 hours
  }
}));

// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

// // import the books module and setup its API path
const books = require("./books.js");
app.use("/api/books", books.routes);

// import the genres module and setup its API path
const genres = require("./genres.js");
app.use("/api/genres", genres.routes);

// import the reviews module and setup its API path
const reviews = require("./reviews.js");
app.use("/api/reviews", reviews.routes);


// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    photoPath: "/images/" + req.file.filename
  });
});


// listen on port 3003
app.listen(3003, () => console.log('Server listening on port 3003!'));
