const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

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

// Define a route for the hotels page
app.get("/hotels", (req, res) => {
  res.render("hotels", { layout: "main" });
});

// Define a route for the venues page
app.get("/venues", (req, res) => {
  res.render("venues", { layout: "main" });
});

// Route to render the main.handlebars template
app.get("/", (req, res) => {
  res.render("layouts/main");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Placeholder data fetching functions (to be replaced with actual API calls)
// Function to fetch location data
async function fetchLocationData(city) {
  // Replace with actual API call to fetch location data
}

// Function to extract GeoID from location data
function extractGeoID(locationData) {
  // Replace with actual data processing to extract GeoID
}

// Function to fetch hotel data
async function fetchHotelData(geoID) {
  // Replace with actual API call to fetch hotel data
}

// Function to fetch hotel details
async function fetchHotelDetails(hotelID) {
  // Replace with actual API call to fetch hotel details
}

// Function to fetch venue data
async function fetchVenueData(city) {
  // Replace with actual API call to fetch venue data
}
