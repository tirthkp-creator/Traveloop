const prisma = require('../config/db');

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
const getActivities = async (req, res) => {
  const activities = await prisma.activity.findMany({
    include: { city: true },
  });
  res.status(200).json(activities);
};

// @desc    Get activities by city
// @route   GET /api/cities/:cityId/activities
// @access  Public
const getCityActivities = async (req, res) => {
  const activities = await prisma.activity.findMany({
    where: { cityId: req.params.cityId },
  });
  res.status(200).json(activities);
};

// @desc    Get single activity
// @route   GET /api/activities/:id
// @access  Public
const getActivity = async (req, res) => {
  const activity = await prisma.activity.findUnique({
    where: { id: req.params.id },
    include: { city: true },
  });

  if (!activity) {
    res.status(404);
    throw new Error('Activity not found');
  }

  res.status(200).json(activity);
};

module.exports = {
  getActivities,
  getCityActivities,
  getActivity,
};
