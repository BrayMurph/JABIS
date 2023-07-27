const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require('express-session');
const passport = require('passport');
const User = require('./models/User');
const authController = require('./controllers/authController');

const app = express();
const port = 3001;

// Create an instance of Handlebars engine
const hbs = exphbs.create({
  /* Specify any Handlebars configuration here */
});

// Configure Handlebars as the template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Route to render the main.handlebars template
app.get("/", (req, res) => {
  res.render("layouts/main");
});

// express session setup
app.use(session({
  secret: process.env.secretKey,
  resave: false,
  saveUninitialized: false,
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// authentication routes
app.post('/login', authController.login);
app.get('/logout', authController.logout);
// add route for registration

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
