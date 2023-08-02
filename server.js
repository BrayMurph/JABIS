const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

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
app.get("/", (req, res) => {
  res.render("layouts/main");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// API Keys
const HotelApiKey = process.env.REACT_APP_HOTEL_API_KEY;
const VenueApiKey = process.env.REACT_APP_VENUE_API_KEY;

// Hotel API
app.get('/api/Hotels', async (req, res) => {
  const locationRes = await axios({
    method: 'get',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation',
    params: {
      query: `London`
    },
    headers: {
      'X-RapidAPI-Key': `${HotelApiKey}`,
      'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
    }
  });
  
  const locationData = locationRes.data.data[0].geoId;
  const str = locationData;
  const arr = str.split('g');
  const geoID = arr[1];
  // return res.json(geoID) // returns the GeoID that I need to put in hotelRes

  const hotelRes = await axios({
    method: 'get',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels',
    params: {
      geoId: `${geoID}`,
      checkIn: '2023-08-07',
      checkOut: '2023-08-09',
      pageNumber: '1',
      currencyCode: 'USD'
    },
    headers: {
      'X-RapidAPI-Key': `${HotelApiKey}`,
      'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
    }
  });

  const hotelData = hotelRes.data.data.data[0].id;
  // return res.json(hotelData); // Pulls the id of the first hotel

  const hotelDetails = await axios({
    method: 'get',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/getHotelDetails',
    params: {
      id: `${hotelData}`,
      checkIn: '2023-08-03',
      checkOut: '2023-08-05',
      currency: 'USD'
    },
    headers: {
      'X-RapidAPI-Key': `${HotelApiKey}`,
      'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
    }
  });

  return res.json(hotelDetails.data);
});

// Venue API
app.get('/api/Venues', async (req, res) => {
  const venueRes = await axios({
    method: 'get',
    url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${VenueApiKey}&city=Charlotte`,
    headers: {
      'Host': 'app.ticketmaster.com',
      'X-Target-URI': 'http://app.ticketmaster.com'
    }
  });
  
  return res.json(venueRes.data._embedded.events[0]);
  });