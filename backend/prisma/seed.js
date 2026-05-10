const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Demo User
  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'demo@traveloop.com' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@traveloop.com',
      passwordHash,
      languagePreference: 'en',
    },
  });

  console.log(`Created user: ${user.name}`);

  // 2. Create Cities
  const paris = await prisma.city.create({
    data: {
      name: 'Paris',
      country: 'France',
      region: 'Europe',
      description: 'The City of Light.',
      costIndex: 4,
      popularityScore: 10,
      latitude: 48.8566,
      longitude: 2.3522,
    },
  });

  const tokyo = await prisma.city.create({
    data: {
      name: 'Tokyo',
      country: 'Japan',
      region: 'Asia',
      description: 'A bustling metropolis.',
      costIndex: 5,
      popularityScore: 9,
      latitude: 35.6762,
      longitude: 139.6503,
    },
  });

  console.log('Created cities');

  // 3. Create Activities
  const eiffelTower = await prisma.activity.create({
    data: {
      cityId: paris.id,
      name: 'Eiffel Tower Tour',
      category: 'sight',
      estimatedCost: 30.0,
      durationMinutes: 120,
    },
  });

  const sushiClass = await prisma.activity.create({
    data: {
      cityId: tokyo.id,
      name: 'Tsukiji Sushi Class',
      category: 'food',
      estimatedCost: 80.0,
      durationMinutes: 180,
    },
  });

  console.log('Created activities');

  // 4. Create Sample Trip
  const trip = await prisma.trip.create({
    data: {
      userId: user.id,
      title: 'Euro Trip 2026',
      description: 'Visiting France and enjoying the culture.',
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-06-15'),
      status: 'planned',
      visibility: 'public',
    },
  });

  console.log('Created trip');

  // 5. Create Sample Trip Stop
  const tripStop = await prisma.tripStop.create({
    data: {
      tripId: trip.id,
      cityId: paris.id,
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-06-05'),
      stopOrder: 1,
      notes: 'First stop in Europe!',
    },
  });

  // 6. Create Trip Activity
  await prisma.tripActivity.create({
    data: {
      tripId: trip.id,
      tripStopId: tripStop.id,
      activityId: eiffelTower.id,
      dayNumber: 2,
      scheduledTime: new Date('2026-06-02T10:00:00Z'),
    },
  });

  console.log('Created stops and activities for trip');

  // 7. Create Sample Budget
  await prisma.budget.create({
    data: {
      tripId: trip.id,
      transportCost: 500,
      stayCost: 800,
      foodCost: 300,
      activityCost: 150,
      miscellaneousCost: 100,
      totalEstimatedCost: 1850,
    },
  });

  // 8. Create Sample Checklist
  await prisma.packingItem.createMany({
    data: [
      { tripId: trip.id, title: 'Passport', category: 'documents', isPacked: false },
      { tripId: trip.id, title: 'Camera', category: 'electronics', isPacked: true },
      { tripId: trip.id, title: 'Jacket', category: 'clothing', isPacked: false },
    ],
  });

  // 9. Create Sample Notes
  await prisma.tripNote.create({
    data: {
      tripId: trip.id,
      tripStopId: tripStop.id,
      title: 'Arrival Details',
      content: 'Flight arrives at 9 AM. Take the train to the city center.',
    },
  });

  // 10. Create Saved Destination
  await prisma.savedDestination.create({
    data: {
      userId: user.id,
      cityId: tokyo.id,
      status: 'wishlist',
    },
  });

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
