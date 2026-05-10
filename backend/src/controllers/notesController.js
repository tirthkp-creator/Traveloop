const prisma = require('../config/db');

// @desc    Get trip notes
// @route   GET /api/trips/:tripId/notes
// @access  Private
const getNotes = async (req, res) => {
  const notes = await prisma.tripNote.findMany({
    where: { tripId: req.params.tripId },
    orderBy: { createdAt: 'desc' },
  });
  res.status(200).json(notes);
};

// @desc    Add note to trip
// @route   POST /api/trips/:tripId/notes
// @access  Private
const addNote = async (req, res) => {
  const { title, content, tripStopId } = req.body;
  const { tripId } = req.params;

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip || trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const note = await prisma.tripNote.create({
    data: {
      tripId,
      tripStopId,
      title,
      content,
    },
  });

  res.status(201).json(note);
};

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
  const note = await prisma.tripNote.findUnique({
    where: { id: req.params.id },
    include: { trip: true }
  });

  if (!note || note.trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const updatedNote = await prisma.tripNote.update({
    where: { id: req.params.id },
    data: req.body,
  });

  res.status(200).json(updatedNote);
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
  const note = await prisma.tripNote.findUnique({
    where: { id: req.params.id },
    include: { trip: true }
  });

  if (!note || note.trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  await prisma.tripNote.delete({ where: { id: req.params.id } });
  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
};
