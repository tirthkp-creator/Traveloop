const prisma = require('../config/db');

// @desc    Get all cities or search/filter
// @route   GET /api/cities
// @access  Public
const getCities = async (req, res) => {
  const { query, region, budget } = req.query;
  
  let where = {};

  if (query) {
    where.name = { contains: query, mode: 'insensitive' };
  }

  if (region) {
    where.region = region;
  }

  if (budget) {
    where.costIndex = { lte: parseInt(budget) };
  }

  const cities = await prisma.city.findMany({
    where,
    orderBy: { popularityScore: 'desc' },
  });

  res.status(200).json(cities);
};

// @desc    Get single city details
// @route   GET /api/cities/:id
// @access  Public
const getCity = async (req, res) => {
  const city = await prisma.city.findUnique({
    where: { id: req.params.id },
    include: { activities: true },
  });

  if (!city) {
    res.status(404);
    throw new Error('City not found');
  }

  res.status(200).json(city);
};

module.exports = {
  getCities,
  getCity,
};
