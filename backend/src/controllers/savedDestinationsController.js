const prisma = require('../config/db');

// @desc    Get user saved destinations (wishlist)
// @route   GET /api/saved-destinations
// @access  Private
const getSavedDestinations = async (req, res) => {
  const saved = await prisma.savedDestination.findMany({
    where: { userId: req.user.id },
    include: { city: true },
  });
  res.status(200).json(saved);
};

// @desc    Save a destination
// @route   POST /api/saved-destinations
// @access  Private
const saveDestination = async (req, res) => {
  const { cityId, status } = req.body;

  // Check if already saved
  const existing = await prisma.savedDestination.findFirst({
    where: {
      userId: req.user.id,
      cityId,
    },
  });

  if (existing) {
    const updated = await prisma.savedDestination.update({
      where: { id: existing.id },
      data: { status: status || 'wishlist' },
      include: { city: true },
    });
    return res.status(200).json(updated);
  }

  const saved = await prisma.savedDestination.create({
    data: {
      userId: req.user.id,
      cityId,
      status: status || 'wishlist',
    },
    include: { city: true },
  });

  res.status(201).json(saved);
};

// @desc    Remove saved destination
// @route   DELETE /api/saved-destinations/:id
// @access  Private
const deleteSavedDestination = async (req, res) => {
  const saved = await prisma.savedDestination.findUnique({
    where: { id: req.params.id },
  });

  if (!saved || saved.userId !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  await prisma.savedDestination.delete({ where: { id: req.params.id } });
  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getSavedDestinations,
  saveDestination,
  deleteSavedDestination,
};
