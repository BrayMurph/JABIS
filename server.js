const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

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

// Hotel API fetch
function hotelApi () {
	const settings = {
		async: true,
		crossDomain: true,
		url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?domain=AE&sort_order=REVIEW&locale=en_GB&checkout_date=2023-09-27&region_id=2872&adults_number=1&checkin_date=2023-09-26&available_filter=SHOW_AVAILABLE_ONLY&meal_plan=FREE_BREAKFAST&guest_rating_min=8&price_min=10&page_number=1&children_ages=4%2C0%2C15&amenities=WIFI%2CPARKING&price_max=500&lodging_type=HOTEL%2CHOSTEL%2CAPART_HOTEL&payment_type=PAY_LATER%2CFREE_CANCELLATION&star_rating_ids=3%2C4%2C5',
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '77ebdb9e7bmshe4b4afb4ed852e5p13b0efjsndafdb1127ce6',
			'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
		}
	};
	
	$.ajax(settings).done(function (response) {
		console.log(response);
		console.log(response.properties[0]);
	});
}

hotelApi();

// Venue API fetch
function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=QGUJP6AjeVwhV37xW4kEQI8HMT9AWhi4`; // QGUJP6AjeVwhV37xW4kEQI8HMT9AWhi4
  
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Venue API");
      console.log(data);
      console.log(data._embedded.events)
    });
  }

getApi();
