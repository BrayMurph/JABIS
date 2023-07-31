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

// import axios from 'axios';


// Hotel API fetch
const apiKey = process.env.REACT_APP_HOTEL_API_KEY;
const apiKey2 = process.env.REACT_APP_VENUE_API_KEY;

app.get('/api', (req, res) => {
  
  axios({
  method: 'get',
  url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?domain=AE&sort_order=REVIEW&locale=en_GB&checkout_date=2023-09-27&region_id=2872&adults_number=1&checkin_date=2023-09-26&available_filter=SHOW_AVAILABLE_ONLY&meal_plan=FREE_BREAKFAST&guest_rating_min=8&price_min=10&page_number=1&children_ages=4%2C0%2C15&amenities=WIFI%2CPARKING&price_max=500&lodging_type=HOTEL%2CHOSTEL%2CAPART_HOTEL&payment_type=PAY_LATER%2CFREE_CANCELLATION&star_rating_ids=3%2C4%2C5',
  headers: {
    'X-RapidAPI-Key': `${apiKey}`,
			'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
  }
}).then((response) => {
  const data = response.data
  res.json(data.filterMetadata.amenities)
})

})

app.get('/api2', (req, res) => {
  axios({
    method: 'get',
    url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey2}`
  }).then((response) => {
    const data = response.data
    res.json(data._embedded.events)
  })
})


