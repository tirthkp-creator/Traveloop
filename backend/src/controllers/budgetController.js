const prisma = require('../config/db');

// @desc    Get trip budget
// @route   GET /api/trips/:tripId/budget
// @access  Private
const getBudget = async (req, res) => {
  const { tripId } = req.params;
  const budget = await prisma.budget.findUnique({
    where: { tripId },
  });

  if (!budget) {
    res.status(404);
    throw new Error('Budget not found');
  }

  res.status(200).json(budget);
};

// @desc    Create/Initialize trip budget
// @route   POST /api/trips/:tripId/budget
// @access  Private
const createBudget = async (req, res) => {
  const { tripId } = req.params;
  const { transportCost, stayCost, foodCost, activityCost, miscellaneousCost } = req.body;

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip || trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Trip not found or unauthorized');
  }

  const total = parseFloat(transportCost || 0) + 
                parseFloat(stayCost || 0) + 
                parseFloat(foodCost || 0) + 
                parseFloat(activityCost || 0) + 
                parseFloat(miscellaneousCost || 0);

  const budget = await prisma.budget.upsert({
    where: { tripId },
    update: {
      transportCost: parseFloat(transportCost || 0),
      stayCost: parseFloat(stayCost || 0),
      foodCost: parseFloat(foodCost || 0),
      activityCost: parseFloat(activityCost || 0),
      miscellaneousCost: parseFloat(miscellaneousCost || 0),
      totalEstimatedCost: total,
    },
    create: {
      tripId,
      transportCost: parseFloat(transportCost || 0),
      stayCost: parseFloat(stayCost || 0),
      foodCost: parseFloat(foodCost || 0),
      activityCost: parseFloat(activityCost || 0),
      miscellaneousCost: parseFloat(miscellaneousCost || 0),
      totalEstimatedCost: total,
    },
  });

  res.status(201).json(budget);
};

// @desc    Update trip budget
// @route   PUT /api/trips/:tripId/budget
// @access  Private
const updateBudget = async (req, res) => {
  const { tripId } = req.params;
  const budgetData = await prisma.budget.findUnique({ where: { tripId } });

  if (!budgetData) {
    res.status(404);
    throw new Error('Budget not found');
  }

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip || trip.userId !== req.user.id) {
    res.status(401);
    throw new Error('Trip unauthorized');
  }

  const { transportCost, stayCost, foodCost, activityCost, miscellaneousCost } = req.body;

  const updatedData = {
    transportCost: transportCost !== undefined ? parseFloat(transportCost) : budgetData.transportCost,
    stayCost: stayCost !== undefined ? parseFloat(stayCost) : budgetData.stayCost,
    foodCost: foodCost !== undefined ? parseFloat(foodCost) : budgetData.foodCost,
    activityCost: activityCost !== undefined ? parseFloat(activityCost) : budgetData.activityCost,
    miscellaneousCost: miscellaneousCost !== undefined ? parseFloat(miscellaneousCost) : budgetData.miscellaneousCost,
  };

  updatedData.totalEstimatedCost = updatedData.transportCost + updatedData.stayCost + updatedData.foodCost + updatedData.activityCost + updatedData.miscellaneousCost;

  const updatedBudget = await prisma.budget.update({
    where: { tripId },
    data: updatedData,
  });

  res.status(200).json(updatedBudget);
};

module.exports = {
  getBudget,
  createBudget,
  updateBudget,
};
