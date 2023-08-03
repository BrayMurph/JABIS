const { ensureAuthenticated, fetchVenueData } = require('../authController');
const router = require('express').Router();



router.get('/api/Venues', async (req, res) => {
  try {
    const venueData = await fetchVenueData();
    
    res.json(venueData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
