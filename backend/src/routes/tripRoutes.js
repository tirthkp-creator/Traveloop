const express = require('express');
const router = express.Router();
const {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
} = require('../controllers/tripController');
const {
  addStop,
  updateStop,
  deleteStop,
  reorderStops,
  addTripActivity,
  removeTripActivity,
} = require('../controllers/itineraryController');
const { protect } = require('../middleware/authMiddleware');
const { validate, tripSchema, stopSchema } = require('../middleware/validateMiddleware');

router.route('/')
  .get(protect, getTrips)
  .post(protect, validate(tripSchema), createTrip);

router.route('/:id')
  .get(protect, getTrip)
  .put(protect, updateTrip)
  .delete(protect, deleteTrip);

// Itinerary - Stops
router.post('/:tripId/stops', protect, validate(stopSchema), addStop);
router.put('/:tripId/stops/reorder', protect, reorderStops);
router.put('/stops/:id', protect, updateStop);
router.delete('/stops/:id', protect, deleteStop);

// Itinerary - Activities
router.post('/:tripId/activities', protect, addTripActivity);
router.delete('/trip-activities/:id', protect, removeTripActivity);

module.exports = router;
