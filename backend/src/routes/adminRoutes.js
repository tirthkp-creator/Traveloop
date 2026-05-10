const express = require('express');
const router = express.Router();
const { getStats, getTopCities, getTopActivities } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, getStats);
router.get('/top-cities', protect, getTopCities);
router.get('/top-activities', protect, getTopActivities);

module.exports = router;
