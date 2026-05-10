const express = require('express');
const router = express.Router();
const { getBudget, createBudget, updateBudget } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

// Note: These will be mounted as /api/trips/:tripId/budget in server.js
router.route('/:tripId/budget')
  .get(protect, getBudget)
  .post(protect, createBudget)
  .put(protect, updateBudget);

module.exports = router;
