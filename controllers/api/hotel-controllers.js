const { ensureAuthenticated, fetchHotelData } = require('../authController');
const router = require('express').Router();

router.get('/api', (req, res) => {
  try {
    res.json({ message: 'This is a sample response' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;