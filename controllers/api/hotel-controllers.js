const { ensureAuthenticated, fetchHotelData } = require('../authController');

const router = require('express').Router();

router.get('/api/Hotels', async (req, res) => {
  try {
    const hotelData = await fetchHotelData();
    
    res.json(hotelData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
