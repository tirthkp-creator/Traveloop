const prisma = require('../config/db');

// @desc    Get admin stats (total users, trips, etc.)
// @route   GET /api/admin/stats
// @access  Private/Admin (For this hackathon, we'll keep it Private)
const getStats = async (req, res) => {
  const totalUsers = await prisma.user.count();
  const totalTrips = await prisma.trip.count();
  
  const tripsByStatus = await prisma.trip.groupBy({
    by: ['status'],
    _count: {
      id: true
    }
  });

  res.status(200).json({
    totalUsers,
    totalTrips,
    tripsByStatus
  });
};

// @desc    Get top cities
// @route   GET /api/admin/top-cities
// @access  Private/Admin
const getTopCities = async (req, res) => {
  const topCities = await prisma.city.findMany({
    orderBy: {
      popularityScore: 'desc'
    },
    take: 5
  });

  res.status(200).json(topCities);
};

// @desc    Get top activities
// @route   GET /api/admin/top-activities
// @access  Private/Admin
const getTopActivities = async (req, res) => {
  // We can determine "top" activities based on those most added to trips
  // For simplicity here, we'll just return activities with the highest duration or cost, 
  // or just a subset. Let's try to count trip activities.
  
  const activityCounts = await prisma.tripActivity.groupBy({
    by: ['activityId'],
    _count: {
      id: true
    },
    orderBy: {
      _count: {
        id: 'desc'
      }
    },
    take: 5
  });

  const topActivities = await Promise.all(activityCounts.map(async (item) => {
    const activity = await prisma.activity.findUnique({
      where: { id: item.activityId },
      include: { city: true }
    });
    return { ...activity, count: item._count.id };
  }));

  res.status(200).json(topActivities);
};

module.exports = {
  getStats,
  getTopCities,
  getTopActivities,
};
