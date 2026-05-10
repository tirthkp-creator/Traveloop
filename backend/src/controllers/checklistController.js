const prisma = require('../config/db');

// @desc    Get trip checklist
// @route   GET /api/trips/:tripId/checklist
// @access  Private
const getChecklist = async (req, res) => {
  const items = await prisma.packingItem.findMany({
    where: { tripId: req.params.tripId },
    orderBy: { createdAt: 'asc' },
  });
  res.status(200).json(items);
};

// @desc    Add item to checklist
// @route   POST /api/trips/:tripId/checklist
// @access  Private
const addChecklistItem = async (req, res) => {
  const { title, category } = req.body;
  const { tripId } = req.params;

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip || trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const item = await prisma.packingItem.create({
    data: {
      tripId,
      title,
      category: category || 'other',
    },
  });

  res.status(201).json(item);
};

// @desc    Update checklist item (toggle packed status)
// @route   PUT /api/checklist/:id
// @access  Private
const updateChecklistItem = async (req, res) => {
  const item = await prisma.packingItem.findUnique({
    where: { id: req.params.id },
    include: { trip: true }
  });

  if (!item || item.trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const updatedItem = await prisma.packingItem.update({
    where: { id: req.params.id },
    data: req.body,
  });

  res.status(200).json(updatedItem);
};

// @desc    Delete checklist item
// @route   DELETE /api/checklist/:id
// @access  Private
const deleteChecklistItem = async (req, res) => {
  const item = await prisma.packingItem.findUnique({
    where: { id: req.params.id },
    include: { trip: true }
  });

  if (!item || item.trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  await prisma.packingItem.delete({ where: { id: req.params.id } });
  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getChecklist,
  addChecklistItem,
  updateChecklistItem,
  deleteChecklistItem,
};
