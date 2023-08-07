const express = require('express');
const router = express.Router();
const axios = require('axios');
const VenueApiKey = process.env.REACT_APP_VENUE_API_KEY;

router.get('/', async (req, res) => {
    const cityQuery = req.query.city;

    try {
        const venueRes = await axios({
            method: 'get',
            url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${VenueApiKey}&city=${cityQuery}&size=5`,
        });

        const venues = venueRes.data._embedded.events;
        return res.json({ venues });
    } catch (error) {
        console.error('Error fetching venues:', error);
        return res.status(500).json({ error: 'Error fetching venues' });
    }
});

module.exports = router;