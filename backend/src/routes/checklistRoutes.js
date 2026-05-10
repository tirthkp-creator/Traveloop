const express = require('express');
const router = express.Router();
const { getChecklist, addChecklistItem, updateChecklistItem, deleteChecklistItem } = require('../controllers/checklistController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:tripId/checklist', protect, getChecklist);
router.post('/:tripId/checklist', protect, addChecklistItem);
router.put('/checklist/:id', protect, updateChecklistItem);
router.delete('/checklist/:id', protect, deleteChecklistItem);

module.exports = router;
