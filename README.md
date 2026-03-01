# QuickHire — Job Portal

A full-stack job portal where admins can post and manage job listings, and candidates can browse, search, and apply directly from the platform.

**Live Demo:** [https://quickhire-job-portal-a4o6.vercel.app](https://quickhire-job-portal-a4o6.vercel.app)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
  - [Backend](#backend-env)
  - [Frontend](#frontend-env)
- [Features](#features)
- [API Reference](#api-reference)
- [Deployment](#deployment)

---

## Overview

QuickHire is a modern job portal built with a Next.js frontend and an Express + MongoDB backend. Job seekers can browse listings, filter by category and location, and submit applications with their resume link and cover note. Admins can log in to create and manage job postings from a protected dashboard.

---

## Tech Stack

**Frontend**

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query) — server state & caching
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — form validation
- [cookies-next](https://github.com/andreizanik/cookies-next) — cookie management

**Backend**

- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [JSON Web Tokens](https://jwt.io/) — authentication
- [Zod](https://zod.dev/) — request validation
- [Helmet](https://helmetjs.github.io/) + [CORS](https://expressjs.com/en/resources/middleware/cors.html) — security

---

## Project Structure

```
quickhire-job-portal/
├── frontend/                  # Next.js application
│   ├── app/                   # App Router pages & layouts
│   │   ├── (public)/          # Public routes (jobs, login, signup)
│   │   ├── admin/             # Protected admin dashboard
│   │   ├── error.tsx          # Global error boundary
│   │   └── not-found.tsx      # Global 404 page
│   ├── components/            # Reusable UI components
│   ├── services/              # API hooks (TanStack Query)
│   ├── lib/                   # Axios client, zod schemas, utils
│   ├── providers/             # React context providers
│   └── hooks/                 # Custom hooks
│
└── backend/                   # Express API server
    ├── src/
    │   ├── config/            # Environment config
    │   ├── middleware/        # Auth, error handling, CORS
    │   ├── models/            # Mongoose models
    │   ├── routes/            # Route definitions
    │   ├── controllers/       # Request handlers
    │   └── validation/        # Zod schemas
    └── ...
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [MongoDB](https://www.mongodb.com/atlas) database (local or Atlas)

### Clone the Repository

```bash
git clone git@github.com:Joyram49/quickhire-job-portal.git
cd quickhire-job-portal
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (see [Backend ENV](#backend-env) below), then:

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build
npm start
```

The API will be available at `http://localhost:8090`.

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory (see [Frontend ENV](#frontend-env) below), then:

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

The app will be available at `http://localhost:3000`.

---

## Environment Variables

### Backend ENV

Create `backend/.env`:

```env
NODE_ENV=development
PORT=8090

# MongoDB connection string
DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>

# JWT
AUTH_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=7d

# Comma-separated list of allowed frontend origins (no trailing slash)
CORS_ORIGIN=http://localhost:3000,https://your-frontend.vercel.app
```

| Variable         | Required | Description                                             |
| ---------------- | -------- | ------------------------------------------------------- |
| `NODE_ENV`       | Yes      | `development` or `production`                           |
| `PORT`           | Yes      | Port the Express server listens on                      |
| `DATABASE_URL`   | Yes      | MongoDB connection URI                                  |
| `AUTH_SECRET`    | Yes      | Secret key used to sign JWTs — keep this private        |
| `JWT_EXPIRES_IN` | Yes      | JWT expiry duration (e.g. `7d`, `1h`)                   |
| `CORS_ORIGIN`    | Yes      | Comma-separated allowed origins — **no trailing slash** |

---

### Frontend ENV

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:8090/api
```

| Variable                       | Required | Description                      |
| ------------------------------ | -------- | -------------------------------- |
| `NEXT_PUBLIC_BACKEND_BASE_URL` | Yes      | Full base URL of the backend API |

---

## Features

### Public

- Browse all job listings with search, category, and location filters
- Debounced search input for efficient filtering
- Paginated job list
- Job detail page with full description
- Apply to a job with name, email, resume link, and optional cover note
- Form validation with Zod + React Hook Form

### Admin (Protected)

- Login with email and password
- Create new job listings
- Delete existing job listings
- Protected routes via JWT authentication

---

## API Reference

All endpoints are prefixed with `/api`.

### Auth

| Method | Endpoint       | Description             | Auth Required |
| ------ | -------------- | ----------------------- | ------------- |
| POST   | `/auth/signup` | Register a new admin    | No            |
| POST   | `/auth/login`  | Login and receive token | No            |
| POST   | `/auth/logout` | Clear session           | No            |
| GET    | `/auth/me`     | Get current user        | Yes           |

### Jobs

| Method | Endpoint    | Description                                                     | Auth Required |
| ------ | ----------- | --------------------------------------------------------------- | ------------- |
| GET    | `/jobs`     | List all jobs (supports `?search=`, `?category=`, `?location=`) | No            |
| GET    | `/jobs/:id` | Get a single job by ID                                          | No            |
| POST   | `/jobs`     | Create a new job listing                                        | Yes           |
| DELETE | `/jobs/:id` | Delete a job listing                                            | Yes           |

### Applications

| Method | Endpoint        | Description              | Auth Required |
| ------ | --------------- | ------------------------ | ------------- |
| POST   | `/applications` | Submit a job application | No            |

---

## Deployment

Both the frontend and backend are deployed on [Vercel](https://vercel.com).

### Backend on Vercel

The Express app is exported as a serverless function. Ensure your `vercel.json` routes all traffic to the Express handler and that all environment variables are set in the Vercel project settings.

### Frontend on Vercel

Standard Next.js deployment. Set `NEXT_PUBLIC_BACKEND_BASE_URL` to your deployed backend URL in the Vercel environment variables.

> **Important:** `CORS_ORIGIN` in your backend must exactly match your frontend's Vercel domain — no trailing slash.

---

## License

This project is for educational purposes. Feel free to fork and build upon it.
