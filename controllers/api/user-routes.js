// const express = require('express');
// const router = express.Router();

// // Route to check if the user is logged in
// router.get('/checkLoggedIn', (req, res) => {
//   if (req.user) {
//     res.status(200).json({ isLoggedIn: true});
//   } else {
//     res.status(200).json({ isLoggedIn: false});
//   }
// });

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });


// module.exports = router;
