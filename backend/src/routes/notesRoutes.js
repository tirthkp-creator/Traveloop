const express = require('express');
const router = express.Router();
const { getNotes, addNote, updateNote, deleteNote } = require('../controllers/notesController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:tripId/notes', protect, getNotes);
router.post('/:tripId/notes', protect, addNote);
router.put('/notes/:id', protect, updateNote);
router.delete('/notes/:id', protect, deleteNote);

module.exports = router;
