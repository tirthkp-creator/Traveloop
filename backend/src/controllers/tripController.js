const prisma = require('../config/db');

// Helper to compute status based on dates
const computeStatus = (startDate, endDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end < today) return 'visited';
  if (start <= today && today <= end) return 'in_progress';
  if (start > today) return 'planned';
  return 'planned'; // Default
};

// @desc    Get all user trips
// @route   GET /api/trips
// @access  Private
const getTrips = async (req, res) => {
  const trips = await prisma.trip.findMany({
    where: { userId: req.user.id },
    orderBy: { startDate: 'desc' },
  });
  res.status(200).json(trips);
};

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Private
const getTrip = async (req, res) => {
  const trip = await prisma.trip.findUnique({
    where: { id: req.params.id },
    include: {
      tripStops: {
        include: { city: true },
        orderBy: { stopOrder: 'asc' },
      },
      budget: true,
      packingItems: true,
      tripNotes: true,
    },
  });

  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }

  if (trip.userId !== req.user.id && trip.visibility !== 'public') {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.status(200).json(trip);
};

// @desc    Create trip
// @route   POST /api/trips
// @access  Private
const createTrip = async (req, res) => {
  const { title, description, startDate, endDate, coverPhoto, visibility } = req.body;

  if (!title || !startDate || !endDate) {
    res.status(400);
    throw new Error('Please provide title, start date, and end date');
  }

  const status = computeStatus(startDate, endDate);

  const trip = await prisma.trip.create({
    data: {
      userId: req.user.id,
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      coverPhoto,
      visibility: visibility || 'private',
      status,
    },
  });

  res.status(201).json(trip);
};

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
const updateTrip = async (req, res) => {
  const trip = await prisma.trip.findUnique({
    where: { id: req.params.id },
  });

  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }

  if (trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const { startDate, endDate } = req.body;
  let data = { ...req.body };
  
  if (startDate) data.startDate = new Date(startDate);
  if (endDate) data.endDate = new Date(endDate);
  
  // Recompute status if dates changed
  if (startDate || endDate) {
    data.status = computeStatus(
      startDate || trip.startDate,
      endDate || trip.endDate
    );
  }

  const updatedTrip = await prisma.trip.update({
    where: { id: req.params.id },
    data,
  });

  res.status(200).json(updatedTrip);
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private
const deleteTrip = async (req, res) => {
  const trip = await prisma.trip.findUnique({
    where: { id: req.params.id },
  });

  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }

  if (trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await prisma.trip.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
};
