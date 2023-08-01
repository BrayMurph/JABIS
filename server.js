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

// Hotel API Search Location
app.get('/api/Hotels/location-search', (req, res) => {
  axios({
    method: 'get',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation',
    params: {
      query: `Charlotte`
    },
    headers: {
      'X-RapidAPI-Key': `${HotelApiKey}`,
      'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
    }
  }).then((response) => {
    const data = response.data
    res.json(data.data[0].geoId)
    const str = res.json(data.data[0].geoId)
    const arr = str.split('g');
    const geoID = arr[1];
    console.log(geoID);
  });
});
  
// Hotel API Search Hotels
app.get('/api/Hotels/hotel-search', (req, res) => {
  axios({
    method: 'get',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels',
    params: {
      geoId: `${geoID}`,
      checkIn: '2023-08-03',
      checkOut: '2023-08-05',
      pageNumber: '1',
      currencyCode: 'USD'
    },
    headers: {
      'X-RapidAPI-Key': `${HotelApiKey}`,
      'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
    }
  }).then((response) => {
    const data = response.data
    res.json(data)
  });
});

// Hotel API Hotel Details
app.get('/api/Hotels/hotel-details', (req, res) => {
  axios({
    method: 'get',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/getHotelDetails',
    params: {
      id: '10542174',
      checkIn: '2023-08-03',
      checkOut: '2023-08-05',
      currency: 'USD'
    },
    headers: {
      'X-RapidAPI-Key': `${HotelApiKey}`,
      'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
    }
  }).then((response) => {
    const data = response.data
    res.json(data)
  });
});

// Venue API Venue Search
app.get('/api/Venues/venue-search', (req, res) => {
  axios({
    method: 'get',
    url: `https://app.ticketmaster.com/discovery/v2/venues.json?keyword=UCV&apikey=${VenueApiKey}`
  }).then((response) => {
    const data = response.data
    res.json(data)
  });
});

// Venue API Venue Details
app.get('/api/Venues/venue-details', (req, res) => {
  axios({
    method: 'get',
    url: `https://app.ticketmaster.com/discovery/v2/venues/KovZpZAFnIEA.json?apikey=${VenueApiKey}`
  }).then((response) => {
    const data = response.data
    res.json(data)
  });
});

