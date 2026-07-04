# Drops

Drops is a modern, responsive web platform designed to streamline blood donation. It connects blood donors with those in need, aiming to save lives through quick and efficient matching.

## Live Demo
[https://dropsforlife.vercel.app](https://dropsforlife.vercel.app)

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express, Prisma
- **Authentication:** JWT, Google OAuth
- **Database:** PostgreSQL (via Prisma)

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL database

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Set up your `.env` variables for the backend (Database URL, JWT Secret, Google Client ID, etc.)
5. Run Prisma migrations:
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```
6. Start the development servers:
   - Frontend: `npm run dev`
   - Backend: `node src/index.js` (inside backend directory)
