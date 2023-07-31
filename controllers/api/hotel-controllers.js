const { ensureAuthenticated, fetchVenueData } = require('./authController');




router.get('/hotels', async (req, res) => {
  try {
    const hotelData = await fetchHotelData();
    
    res.json(hotelData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;

