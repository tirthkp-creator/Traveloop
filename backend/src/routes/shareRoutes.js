const express = require('express');
const router = express.Router();
const { shareTrip, getPublicTrip } = require('../controllers/shareController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/trips/:tripId/share
router.post('/:tripId/share', protect, shareTrip);

// GET /api/share/:shareSlug (Public)
router.get('/:shareSlug', getPublicTrip);

module.exports = router;
