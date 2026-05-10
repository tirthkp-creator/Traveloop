# Traveloop - Personalized Travel Planning

Personalized travel planning platform where users can create trips, add city stops, assign activities, track budgets, manage packing checklists, and share itineraries.

## 🚀 Recent Upgrade: Scalable PostgreSQL Architecture
Traveloop now features a robust backend system:
- **Relational Database**: 12+ optimized tables for complex travel data.
- **Prisma ORM**: Type-safe database queries and migrations.
- **REST APIs**: Full suite of endpoints for trips, itinerary, auth, and analytics.
- **Living Travel Map**: Marker system integrated with real trip statuses.

## 🛠 Tech Stack
- **Frontend**: React + Vite + Framer Motion
- **Backend**: Node.js + Express
- **Database**: PostgreSQL + Prisma
- **Auth**: JWT + Bcrypt

For setup and installation, see the [Backend README](./backend/README.md).

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
