const express = require('express');
const router = express.Router();
const { getCities, getCity } = require('../controllers/cityController');
const { getCityActivities } = require('../controllers/activityController');

router.get('/', getCities);
router.get('/:id', getCity);
router.get('/:cityId/activities', getCityActivities);

module.exports = router;
