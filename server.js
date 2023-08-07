const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require('express-session');
const passport = require("./config/passport");
const routes = require('./controllers');
const signupController = require('./controllers/signupController');
const bodyParser = require('body-parser');
const sequelize = require('./config/connection')
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

// Create an instance of Handlebars engine
const hbs = exphbs.create({
  /* Specify any Handlebars configuration here */
});

//Joins the controller to the server
app.use(routes);

// Configure Handlebars as the template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Define a route for the venues page
app.get("/venues", (req, res) => {
  res.render("venues", { layout: "main" });
});

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Parse incoming request bodies in a middleware before your routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main.handlebars template
app.get("/", (req, res) => {
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

app.get("/", (req, res) => {
  res.render("homepage", { isAuthenticated: req.isAuthenticated() });
});

// Route to render the login.handlebars template
app.get("/login", (req, res) => {
  res.render("login", {layout: "main"});
});

// Route to logout
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.redirect('/');
    }
    console.log('User logged out successfully');
    return res.redirect('/');
  });
});

// Handle logging in
app.post('/api/users/login', passport.authenticate('local'), (req, res) => {
  // If authentication is successful, respond with user information or any data you want
  res.json({ user: req.user });
});

// Handle signup form submission using the new signup controller
app.post('/signup', signupController.signup);

require("./routes/signin")(app);

// Start the server
sequelize.sync({ force:false })
.then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

