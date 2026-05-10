# Traveloop Backend

Scalable PostgreSQL database architecture for personalized travel planning, optimized for Supabase.

## Tech Stack
- **Node.js + Express**
- **Prisma ORM**
- **PostgreSQL (Supabase)**
- **JWT + Bcrypt** for Authentication

## ☁️ Supabase + PostgreSQL Setup

### 1. Database Configuration
1. Go to your **Supabase Project Settings > Database**.
2. Copy the **Connection String** for URI format.
3. In your `.env` file:
   - Set `DATABASE_URL` to the **Transaction** mode URL (usually port 6543).
   - Set `DIRECT_URL` to the **Session** mode URL (usually port 5432).
4. Run migrations to sync the schema to Supabase:
   ```bash
   npx prisma migrate dev --name init
   ```

### 2. Getting Started
```bash
# Install dependencies
npm install

# Seed the database
npx prisma db seed

# Run in development
npm run dev
```

## API Endpoints

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Trips
- `GET /api/trips`
- `POST /api/trips`
- `GET /api/trips/:id`
- `PUT /api/trips/:id`
- `DELETE /api/trips/:id`

### Itinerary
- `POST /api/trips/:tripId/stops`
- `PUT /api/trips/:tripId/stops/reorder`
- `POST /api/trips/:tripId/activities`

### Shared & Wishlist
- `GET /api/saved-destinations`
- `POST /api/saved-destinations`
- `GET /api/share/:shareSlug`
