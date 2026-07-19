# Drops

Drops is a modern, responsive web platform designed to streamline blood donation. It connects blood donors with those in need, aiming to save lives through quick and efficient matching.



## 🌐 Live Demo
[https://dropsforlife.vercel.app](https://dropsforlife.vercel.app)

## 🚀 Key Features
- **User Authentication:** Secure login and registration using Google OAuth or email/password.
- **Donor Search:** Find blood donors based on blood type and location.
- **Onboarding & Profiles:** Dedicated onboarding flows and user profile management.
- **Impact Tracking:** See the impact of blood donations in the community.
- **Responsive Design:** Optimized for both mobile and desktop devices with Tailwind CSS.

## 💻 Primary Technologies
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (managed via Prisma ORM)
- **Authentication:** JSON Web Tokens (JWT), Google Auth Library

## 📦 Project Dependencies
**Frontend (Vite + React):**
- `@react-oauth/google`
- `axios`
- `lucide-react`
- `react` / `react-dom`
- `react-hot-toast`
- `react-router-dom`

**Backend (Node + Express):**
- `@prisma/client`
- `bcrypt`
- `cors`
- `dotenv`
- `express`
- `google-auth-library`
- `jsonwebtoken`

## 🛠️ How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A running PostgreSQL database instance

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ArafatSany7/Drops.git
   cd Drops
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Configuration:**
   Create a `.env` file in the `backend` directory and add the necessary variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dropsdb"
   JWT_SECRET="your_jwt_secret"
   GOOGLE_CLIENT_ID="your_google_client_id"
   ```

5. **Database Setup:**
   Run Prisma migrations to set up your database schema.
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```

6. **Start the Application:**
   Open two terminal windows/tabs.
   
   *Terminal 1 (Backend):*
   ```bash
   cd backend
   node src/index.js # or your backend start script
   ```
   
   *Terminal 2 (Frontend):*
   ```bash
   npm run dev
   ```
   The frontend will typically be accessible at `http://localhost:5173`.

## 🔗 Relevant Links
- **Live Platform:** [https://dropsforlife.vercel.app](https://dropsforlife.vercel.app)
- **React Documentation:** [https://react.dev/](https://react.dev/)
- **Vite Documentation:** [https://vitejs.dev/](https://vitejs.dev/)
- **Prisma Documentation:** [https://www.prisma.io/docs/](https://www.prisma.io/docs/)
