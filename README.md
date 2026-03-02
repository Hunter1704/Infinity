<div align="center">

# ♾️ Infinity

### A Modern Full-Stack Competitive Coding Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)

*Solve problems. Track progress. Compete. Learn with AI.*

</div>

---

## 📚 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Database Models](#-database-models)
- [Authentication](#-authentication)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🌟 Overview

**Infinity** is a feature-rich, full-stack competitive programming platform designed for developers who want to sharpen their coding skills. It supports multi-language code execution via **Judge0**, provides an **AI assistant** for problem hints and complexity analysis, tracks user activity with **streaks and leaderboards**, and includes a full **Admin Portal** for managing the platform.

---

## ✨ Features

### 👨‍💻 For Users
| Feature | Description |
|---|---|
| 🔐 **Authentication** | Register / Login with Email, Google OAuth, or GitHub OAuth |
| ✉️ **Email Verification** | Secure account verification via email |
| 💻 **Code Editor** | Full-featured Monaco Editor with syntax highlighting for 5 languages |
| 🚀 **Code Execution** | Run & Submit solutions powered by Judge0 |
| 🤖 **AI Assistant** | Chat with AI for hints, explanations, and time/space complexity analysis |
| 🏆 **Leaderboard** | Global leaderboard ranked by points |
| 📊 **Activity Tracking** | Daily & yearly coding activity heatmaps |
| 🔥 **Streaks** | Track current and longest coding streaks |
| ❤️ **Problem Interactions** | Like, favourite, bookmark, and comment on problems |
| 📋 **Sprints** | Organize problems into custom sprint lists |
| 👤 **Profile Management** | Update profile, upload avatar via Cloudinary |
| 📺 **Solution Videos** | Watch editorial/solution videos for problems |
| 🏅 **Contests** | Participate in time-limited coding contests |
| 📚 **Courses** | Browse and access structured learning courses |
| 💎 **Premium Plans** | Unlock premium features via subscription |
| 📈 **Submission History** | View all past submissions with verdicts |

### 🛡️ For Admins
| Feature | Description |
|---|---|
| ➕ **Create Problems** | Add new problems with test cases, examples, and starter code |
| ✏️ **Update Problems** | Edit existing problem content and metadata |
| 🗑️ **Delete Problems** | Remove problems from the platform |
| 📹 **Manage Solution Videos** | Attach/update editorial videos for problems |
| 👥 **Admin Registration** | Create new admin accounts securely |

---

## 🛠️ Tech Stack

### Frontend (`/client`)

| Category | Technology |
|---|---|
| **Framework** | React 19 + Vite 7 |
| **Routing** | React Router DOM v7 |
| **State Management** | Redux Toolkit + React Redux |
| **UI / Styling** | Tailwind CSS v4, DaisyUI v5, Framer Motion |
| **Code Editor** | Monaco Editor (`@monaco-editor/react`) |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Forms** | React Hook Form + Zod (validation) |
| **HTTP Client** | Axios |
| **Notifications** | React Hot Toast |
| **QR Code** | React QR Code |
| **Syntax Highlight** | React Syntax Highlighter |

### Backend (`/server`)

| Category | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express v5 |
| **Database** | MongoDB (Mongoose ODM) |
| **Caching** | Redis |
| **Authentication** | JWT (jsonwebtoken) + bcrypt |
| **OAuth** | Google OAuth 2.0, GitHub OAuth |
| **AI** | Google Generative AI (`@google/genai`) |
| **Code Execution** | Judge0 API |
| **Email** | Nodemailer |
| **File Uploads** | Cloudinary |
| **Validation** | Validator.js |
| **Dev Tool** | Nodemon |

---

## 📁 Project Structure

```
infinity/
├── client/                     # React Frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Static assets (images, icons)
│   │   ├── components/         # Reusable React components
│   │   ├── config/             # Axios instance & app config
│   │   ├── pages/              # All page-level components
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProblemsPage.jsx
│   │   │   ├── ProblemPage.jsx
│   │   │   ├── ContestsPage.jsx
│   │   │   ├── CoursesPage.jsx
│   │   │   ├── LeaderboardPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── AccountPage.jsx
│   │   │   ├── AdminPortal.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   └── ...             # 34 pages total
│   │   ├── services/           # API service layer
│   │   ├── slices/             # Redux slices
│   │   ├── utils/              # Utility/helper functions
│   │   ├── store.js            # Redux store
│   │   ├── App.jsx             # Root component & routes
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── server/                     # Express Backend
    ├── src/
    │   ├── config/             # DB, Redis, and other configs
    │   ├── controllers/        # Route handler logic
    │   │   ├── authentication/ # Register, login, OAuth, email verify
    │   │   ├── problems/       # CRUD, submit, run, like, favourite
    │   │   ├── profile/        # Profile update, leaderboard, sprints
    │   │   ├── submissions/    # Submission history
    │   │   ├── ai/             # AI chat, complexity analysis
    │   │   └── admin/          # Admin-specific actions
    │   ├── middlewares/        # verifyToken, isAdmin, doesAccountExist, etc.
    │   ├── models/             # Mongoose schemas
    │   │   ├── users.js
    │   │   ├── problems.js
    │   │   ├── submissions.js
    │   │   └── solutionVideo.js
    │   ├── routes/             # Express route definitions
    │   │   ├── authentication.js
    │   │   ├── problems.js
    │   │   ├── profile.js
    │   │   ├── submissions.js
    │   │   ├── ai.js
    │   │   ├── solutionVideo.js
    │   │   └── admin.js
    │   ├── judge0/             # Judge0 integration helpers
    │   ├── utils/              # Shared utilities
    │   └── index.js            # App entry point
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Redis](https://redis.io/) (optional for local dev)
- [Judge0](https://judge0.com/) API key (RapidAPI or self-hosted)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/infinity.git
cd infinity
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside `/server` (see [Environment Variables](#-environment-variables) section below).

```bash
# Start in development mode
npm run dev

# OR start in production mode
npm start
```

> The server starts on `http://localhost:<PORT>`

### 3. Setup the Frontend

```bash
cd client
npm install
```

Create a `.env` file inside `/client` (see [Environment Variables](#-environment-variables) section below).

```bash
# Start the dev server
npm run dev
```

> The client starts on `http://localhost:5173` by default.

---

## 🔐 Environment Variables

### Server (`/server/.env`)

```env
# Server
PORT=3000

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/codingPlatform

# JWT
JWT_SECRET=your_jwt_secret_key

# Frontend URL (for CORS)
FRONTEND_ORIGIN=http://localhost:5173

# Redis
REDIS_URL=redis://localhost:6379

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/authentication/google/callback

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=http://localhost:3000/authentication/github/callback

# Nodemailer (Email)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Cloudinary (Profile Images)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google Generative AI
GOOGLE_GENAI_API_KEY=your_gemini_api_key

# Judge0 (Code Execution)
JUDGE0_API_KEY=your_judge0_api_key
JUDGE0_BASE_URL=https://judge0-ce.p.rapidapi.com
```

### Client (`/client/.env`)

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

## 📡 API Reference

All API routes are prefixed accordingly. Authentication is handled via **HTTP-only cookies** (JWT).

### 🔑 Authentication — `/authentication`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | ❌ | Register a new user |
| `POST` | `/login` | ❌ | Login with email & password |
| `POST` | `/logout` | ✅ | Logout current user |
| `GET` | `/check` | ✅ | Verify token & get user info |
| `GET` | `/google` | ❌ | Redirect to Google OAuth |
| `GET` | `/google/callback` | ❌ | Google OAuth callback |
| `GET` | `/github` | ❌ | Redirect to GitHub OAuth |
| `GET` | `/github/callback` | ❌ | GitHub OAuth callback |
| `GET` | `/verify-email/initialize` | ✅ | Send verification email |
| `GET` | `/verify-email` | ❌ | Verify email via token link |
| `POST` | `/admin/register` | ✅ Admin | Create a new admin account |

### 🧩 Problems — `/problems`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | ✅ | Get all problems |
| `GET` | `/:problemId` | ✅ | Get a specific problem |
| `GET` | `/user` | ✅ | Get saved/liked/solved problems |
| `POST` | `/create` | ✅ Admin | Create a new problem |
| `PUT` | `/:id/update` | ✅ Admin | Update a problem |
| `DELETE` | `/:id/delete` | ✅ Admin | Delete a problem |
| `POST` | `/:problemId/submit` | ✅ | Submit a solution |
| `POST` | `/:problemId/run` | ✅ | Run code (test only) |
| `POST` | `/:problemId/like` | ✅ | Like a problem |
| `DELETE` | `/:problemId/like` | ✅ | Remove like |
| `GET` | `/:problemId/liked-by-me` | ✅ | Check if problem is liked |
| `POST` | `/:problemId/favourite` | ✅ | Favourite a problem |
| `DELETE` | `/:problemId/favourite` | ✅ | Remove favourite |
| `GET` | `/:problemId/my-favourite` | ✅ | Check if favourited |
| `PUT` | `/:id/update-bookmarks` | ✅ | Update bookmarks/sprints |
| `POST` | `/:id/add-comment` | ✅ | Add a comment |
| `GET` | `/:problemId/user-data` | ✅ | Get user data for a problem |

### 👤 Profile — `/profile`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/@me` | ✅ | Get my profile |
| `PATCH` | `/update` | ✅ | Update profile info |
| `GET` | `/image/upload` | ✅ | Get Cloudinary upload signature |
| `PATCH` | `/image/save` | ✅ | Save uploaded image URL |
| `GET` | `/get-daily-activity` | ✅ | Daily coding activity |
| `GET` | `/get-yearly-activity` | ✅ | Yearly coding heatmap data |
| `GET` | `/checked-problems` | ✅ | Problems solved/attempted |
| `GET` | `/leaderboard` | ✅ | Global leaderboard |
| `GET` | `/users-count` | ✅ | Total registered users count |
| `GET` | `/leaderboard/:userId` | ✅ | Get a user's public profile |
| `GET` | `/my-sprints` | ✅ | Get current user's sprints |

### 📬 Submissions — `/submissions`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/recent` | ✅ | Get recent submissions |

### 🤖 AI — `/ai`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/chatAI` | ✅ | Chat with AI about a problem |
| `POST` | `/complexities` | ✅ | Get time & space complexity |

### 📹 Solution Videos — `/solution-video`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/:problemId` | ✅ | Get solution video for a problem |
| `POST`/`PUT` | `/:problemId` | ✅ Admin | Add/update solution video |

### 🛡️ Admin — `/admin`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| Admin-specific routes | Various | ✅ Admin | Admin-only management actions |

---

## 🗄️ Database Models

### `users`
```
username, fullName, emailId, emailVerified, age, profileImageUrl,
role (user | admin), password, noSolvedProblems, checkedProblems[],
favouriteProblems[], likedProblems[], bookmarks (sprints)[],
points, streaks (current, longest, lastUpdated), timestamps
```

### `problems`
```
title, problemNo, description, difficulty (Basic|Easy|Medium|Hard),
tags[], acceptance, constraints[], starterCode (per language)[],
examples[], visibleTestCases[], hiddenTestCases[],
referenceSolution (per language)[], problemCreator, likes,
companies[], hints[], comments[], timestamps
```

**Supported Languages:** `c`, `cpp`, `java`, `python`, `javascript`

**Available Tags:** `arrays`, `strings`, `linked-list`, `stacks`, `queues`,
`hash-maps`, `sorting`, `searching`, `binary-search`, `graphs`, `trees`,
`dynamic-programming`, `backtracking`, `greedy`, `heap`, `bit-manipulation`,
`two-pointers`, `sliding-window`, `recursion`, `design`, `math`, `prefix-sum`, and more.

### `submissions`
```
userId, problemId, language, code, verdict, runtime, timestamps
```

### `solutionVideo`
```
problemId, videoUrl, timestamps
```

---

## 🔒 Authentication

Infinity uses a **JWT-based authentication** system with tokens stored in **HTTP-only cookies** for security.

```
[Client Request]
      │
      ▼
[verifyToken Middleware]  ──▶  Reads JWT from cookie
      │
      ▼
[doesAccountExist]        ──▶  Confirms user exists in DB
      │
      ▼
[isAdmin] (if needed)     ──▶  Checks role === "admin"
      │
      ▼
[Controller Handler]
```

**OAuth Flows Supported:**
- 🔵 **Google OAuth 2.0** — via `google-auth-library` + redirect flow
- ⚫ **GitHub OAuth** — via GitHub OAuth App + redirect flow

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork** the repository
2. **Create** a new branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

Please make sure your code is clean and follows the existing code style.

---

## 👨‍💻 Author

**Jatin Agrawal**

> Built with passion 💜 — Infinity is crafted to make competitive programming accessible, engaging, and intelligent.

---

<div align="center">

⭐ **If you found this project useful, please give it a star!** ⭐

</div>
