const VenueApiKey = process.env.REACT_APP_VENUE_API_KEY;
let venue = [];

function search(event) {
    event.preventDefault();

    const city = document.querySelector('#location').value.trim();

    apiCall(city)
    .then(document.location.replace('/venues'))
    
}


function apiCall() {
    venue = [];
    const cityQuery = req.query.city;

    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${VenueApiKey}&city=${cityQuery}&size=5`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const venues = data.data._embedded.events;
            let dataVar = {
                name: venues.name,
                url: venues.url,
                img: venues.images[0].url,
                priceMin: venues.priceRanges[0].min,
                priceMax: venues.priceRanges[0].max,
            };
            venue.push(dataVar);
            console.log(venue);
        })
}

document
    .querySelector('#searchForm')
    .addEventListener('submit', search);

// const apiSearch = async () => {
//   console.log('hello');
//   const cityQuery = req.query.city;
//   console.log(cityQuery);


  

// }
// router.get('/api/search', async (req, res) => {
//     const venueRes = await axios({
//       method: 'get',
//       url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${VenueApiKey}&city=${cityQuery}&size=5`,
//       headers: {
//         'Host': 'app.ticketmaster.com',
//         'X-Target-URI': 'http://app.ticketmaster.com'
//       }
//     });
//     console.log(venueRes.data);
//     const venues = venueRes.data._embedded.events;
//     return res.json({venues});
//   });

// module.exports = apiSearch;
