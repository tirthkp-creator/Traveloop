const prisma = require('../config/db');

// @desc    Add stop to trip
// @route   POST /api/trips/:tripId/stops
// @access  Private
const addStop = async (req, res) => {
  const { cityId, startDate, endDate, stopOrder, notes } = req.body;
  const { tripId } = req.params;

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip || trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Trip not found or unauthorized');
  }

  const stop = await prisma.tripStop.create({
    data: {
      tripId,
      cityId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      stopOrder: parseInt(stopOrder),
      notes,
    },
    include: { city: true }
  });

  res.status(201).json(stop);
};

// @desc    Update stop
// @route   PUT /api/stops/:id
// @access  Private
const updateStop = async (req, res) => {
  const stop = await prisma.tripStop.findUnique({
    where: { id: req.params.id },
    include: { trip: true }
  });

  if (!stop || stop.trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Stop not found or unauthorized');
  }

  const { startDate, endDate, stopOrder, notes } = req.body;
  const updatedStop = await prisma.tripStop.update({
    where: { id: req.params.id },
    data: {
      startDate: startDate ? new Date(startDate) : stop.startDate,
      endDate: endDate ? new Date(endDate) : stop.endDate,
      stopOrder: stopOrder !== undefined ? parseInt(stopOrder) : stop.stopOrder,
      notes: notes !== undefined ? notes : stop.notes,
    },
    include: { city: true }
  });

  res.status(200).json(updatedStop);
};

// @desc    Delete stop
// @route   DELETE /api/stops/:id
// @access  Private
const deleteStop = async (req, res) => {
  const stop = await prisma.tripStop.findUnique({
    where: { id: req.params.id },
    include: { trip: true }
  });

  if (!stop || stop.trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Stop not found or unauthorized');
  }

  await prisma.tripStop.delete({ where: { id: req.params.id } });
  res.status(200).json({ id: req.params.id });
};

// @desc    Reorder stops
// @route   PUT /api/trips/:tripId/stops/reorder
// @access  Private
const reorderStops = async (req, res) => {
  const { stops } = req.body; // Array of { id, stopOrder }
  const { tripId } = req.params;

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip || trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Trip not found or unauthorized');
  }

  const updates = stops.map(stop => 
    prisma.tripStop.update({
      where: { id: stop.id },
      data: { stopOrder: stop.stopOrder }
    })
  );

  await Promise.all(updates);
  res.status(200).json({ message: 'Stops reordered' });
};

// @desc    Add activity to trip
// @route   POST /api/trips/:tripId/activities
// @access  Private
const addTripActivity = async (req, res) => {
  const { tripStopId, activityId, dayNumber, scheduledTime, customTitle, customCost, notes } = req.body;
  const { tripId } = req.params;

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip || trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Trip not found or unauthorized');
  }

  const tripActivity = await prisma.tripActivity.create({
    data: {
      tripId,
      tripStopId,
      activityId,
      dayNumber: dayNumber ? parseInt(dayNumber) : null,
      scheduledTime: scheduledTime ? new Date(scheduledTime) : null,
      customTitle,
      customCost: customCost ? parseFloat(customCost) : null,
      notes,
    },
    include: { activity: true }
  });

  res.status(201).json(tripActivity);
};

// @desc    Remove activity from trip
// @route   DELETE /api/trip-activities/:id
// @access  Private
const removeTripActivity = async (req, res) => {
  const tripActivity = await prisma.tripActivity.findUnique({
    where: { id: req.params.id },
    include: { trip: true }
  });

  if (!tripActivity || tripActivity.trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Activity not found or unauthorized');
  }

  await prisma.tripActivity.delete({ where: { id: req.params.id } });
  res.status(200).json({ id: req.params.id });
};

module.exports = {
  addStop,
  updateStop,
  deleteStop,
  reorderStops,
  addTripActivity,
  removeTripActivity,
};
