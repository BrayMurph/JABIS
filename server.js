const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const authController = require('./controllers/authController');
const routes = require('./controllers');

const app = express();
const port = 3001;

// Create an instance of Handlebars engine
const hbs = exphbs.create({
  /* Specify any Handlebars configuration here */
});

// Configure Handlebars as the template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// Define a route for the hotels page
app.get("/hotels", (req, res) => {
  res.render("hotels", { layout: "main" });
});

// Define a route for the venues page
app.get("/venues", (req, res) => {
  res.render("venues", { layout: "main" });
});

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Route to render the main.handlebars template
app.get("/homepage", (req, res) => {
  res.render("homepage");
});

// Route to render the signup.handlebars template
app.get("/signup", (req, res) => {
  res.render("signup", {layout: "main"});
});

// Route to render the login.handlebars template
app.get("/login", (req, res) => {
  res.render("login", {layout: "main"});
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

// PassportConfiguration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// authentication routes
app.post('/login', authController.login);
app.get('/logout', authController.logout);
// add route for registration

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});