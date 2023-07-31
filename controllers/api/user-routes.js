const express = require('express');
const router = express.Router();
const authController = require('./authController');
const User = require('../models/User'); 
// Route for user registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the user already exists in the database
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
      }
      const newUser = await User.create({ username, password });

      
      res.json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });  

// Route for user login
router.post('/login', authController.login);

// Route for user logout
router.post('/logout', authController.logout);

// Route for updating user profile 
router.put('/profile', async (req, res) => {
  const { username, newPassword } = req.body;
  const userId = req.user.id; 

  try {
    // Find the user by ID 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's username 
    if (username) {
      user.username = username;
      await user.save();
    }

    // Update the user's password 
    if (newPassword) {
      
      await user.save();
    }

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
