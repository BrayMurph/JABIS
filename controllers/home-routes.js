const express = require('express');
const router = express.Router();
const axios = require('axios');
const VenueApiKey = process.env.REACT_APP_VENUE_API_KEY;

router.get('/search', async (req, res) => {
    const cityQuery = req.query.city;
    // console.log(req.session.loggedIn);
    try {
        const venueRes = await axios({
            method: 'get',
            url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${VenueApiKey}&city=${cityQuery}&size=5`,
        });

        const venues = venueRes.data._embedded.events;
        // res.json(venues[0].priceRanges[0].min);
        return res.render('venues', { venues });
    } catch (error) {
        console.error('Error fetching venues:', error);
        return res.status(500).json({ error: 'Error fetching venues' });
    }
});


module.exports = router;