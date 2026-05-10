const express = require('express');
const router = express.Router();
const { getSavedDestinations, saveDestination, deleteSavedDestination } = require('../controllers/savedDestinationsController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getSavedDestinations)
  .post(protect, saveDestination);

router.delete('/:id', protect, deleteSavedDestination);

module.exports = router;
