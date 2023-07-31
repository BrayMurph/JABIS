const express = require('express');
const session = require('express-session');
const passport = require('passport');
const userRoutes = require('./user.routes');
const venueRoutes = require('./api/venue-controller'); 
const hotelRoutes = require('./api/hotel-controllers'); 
const { ensureAuthenticated } = require('./authController');

const app = express();
const port = 3000;

app.use(session({
  secret: 'your-secret-key', 
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


app.use('/api/user', userRoutes); 
app.use('/api/venues', venueRoutes); 
app.use('/api/hotels', hotelRoutes); 


app.get('/protected', ensureAuthenticated, (req, res) => {
  res.json({ message: 'This route is protected and only accessible to authenticated users.' });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
