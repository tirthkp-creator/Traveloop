const prisma = require('../config/db');
const crypto = require('crypto');

// @desc    Generate a public share link for a trip
// @route   POST /api/trips/:tripId/share
// @access  Private
const shareTrip = async (req, res) => {
  const { tripId } = req.params;

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip || trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  // Generate a random slug
  const shareSlug = crypto.randomBytes(4).toString('hex');

  const share = await prisma.publicShare.create({
    data: {
      tripId,
      shareSlug,
    },
  });

  res.status(201).json(share);
};

// @desc    Get public itinerary by slug
// @route   GET /api/share/:shareSlug
// @access  Public
const getPublicTrip = async (req, res) => {
  const share = await prisma.publicShare.findUnique({
    where: { shareSlug: req.params.shareSlug },
    include: {
      trip: {
        include: {
          user: {
            select: { name: true, profilePhoto: true }
          },
          tripStops: {
            include: { city: true },
            orderBy: { stopOrder: 'asc' }
          },
          tripActivities: {
            include: { activity: true }
          },
          budget: true, // Optional: Maybe don't share budget? But requirement says share public itinerary.
          tripNotes: true,
        }
      }
    }
  });

  if (!share || !share.isActive) {
    res.status(404);
    throw new Error('Public itinerary not found or inactive');
  }

  res.status(200).json(share.trip);
};

module.exports = {
  shareTrip,
  getPublicTrip,
};
