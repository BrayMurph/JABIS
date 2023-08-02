// API Keys
const HotelApiKey = process.env.REACT_APP_HOTEL_API_KEY;
const VenueApiKey = process.env.REACT_APP_VENUE_API_KEY;

// API to Front End
const locationSearch = async (event) => {
  event.preventDefault();

  const city = document.querySelector('#location').value.trim();
  if (city) {
    const response = await fetch('/', {
      method: 'POST',
      body: JSON.stringify({city}),
      headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
      document.location.replace('/api');
    } else {
      alert('Failed to input city.');
    }
  }
}

document 
  .querySelector('#searchForm')
  .addEventListener('submit', locationSearch);

// Hotel API
app.get('/api', async (req, res) => {
  const locationRes = await axios({
    method: 'get',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation',
    params: {
      query: `${city}`
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

  // return res.json(hotelDetails.data);

  const venueRes = await axios({
    method: 'get',
    url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${VenueApiKey}&city=${city}`,
    headers: {
      'Host': 'app.ticketmaster.com',
      'X-Target-URI': 'http://app.ticketmaster.com'
    }
  });

//  return res.json(venueRes.data._embedded.events[0]);
});

// Venue API
app.get('/api/Venues', async (req, res) => {
  
  
  
  });