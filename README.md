# Bvoc SD

> A centralized academic platform for B.Voc Software Development students to access learning resources, manage academic content, and collaborate through a community-driven learning environment.

---

## 📌 Overview

**Bvoc SD** is a full-stack web application designed for students and administrators of the **Bachelor of Vocation (B.Voc) in Software Development** program.

The platform brings academic resources, student management, and collaborative learning into one place.

Students can browse learning materials based on their academic structure, while administrators can manage programs, semesters, subjects, batches, students, and resources through a dedicated admin dashboard.

The project is designed with scalability, maintainability, security, and a clean user experience in mind.

---

## ✨ Features

### 🎓 Student Features

- Student registration and authentication
- Secure login and logout
- Access academic resources
- Browse resources by:
  - Program
  - Semester
  - Subject
  - Batch
- Search for learning resources
- Responsive interface
- Dark/light theme support
- Community discussion area
- Ask questions and participate in discussions
- Share knowledge with other students

### 🛠️ Admin Features

- Secure admin authentication
- Admin dashboard
- Manage students
- Manage batches
- Manage semesters
- Manage subjects
- Manage academic programs
- Manage learning resources
- Add, edit, and delete resources
- Search and filter academic data
- Organize resources according to the academic hierarchy

### 🔐 Authentication & Security

- Token-based authentication
- Password hashing
- Protected API routes
- Role-based access control
- Request validation
- Server-side validation
- Database constraints
- Secure error handling

---

## 🏗️ Project Architecture

The project is divided into separate frontend and backend applications rather than using a monorepo structure.

```text
Bvoc-SD/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── Context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   └── ...
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── package.json
│   └── ...
│
└── README.
```

---

## 🚀 Tech Stack

### Frontend

- **React** — UI development
- **Vite** — Development and build tooling
- **Tailwind CSS** — Styling and responsive design
- **React Router** — Client-side routing
- **Axios** — API communication
- **Lucide React** — Icons
- **Context API** — Global state management

### Backend

- **Node.js** — JavaScript runtime
- **Express.js** — REST API framework
- **Prisma** — Database ORM
- **Zod** — Request validation
- **JWT** — Authentication
- **bcrypt** — Password hashing

### Database

- **PostgreSQL** — Relational database
- **Prisma Migrate** — Database schema migrations

---

## 📚 Academic Structure

Bvoc SD follows a structured academic hierarchy for organizing learning resources.

```text
Program
   │
   ├── Semester
   │      │
   │      ├── Subject
   │      │      │
   │      │      └── Resources
   │      │
   │      └── Subject
   │
   └── Semester
          │
          └── Subject
```

This structure allows students to easily find resources based on their program, semester, and subject.

---

## 🔄 Application Flow

### Student Flow

```text
Register
   ↓
Login
   ↓
Student Dashboard
   ↓
Select Program
   ↓
Select Semester
   ↓
Select Subject
   ↓
Browse Resources
   ↓
Open / Download Resource
```

### Admin Flow

```text
Admin Login
     ↓
Admin Dashboard
     ↓
Manage Academic Structure
     ↓
Programs
     ↓
Semesters
     ↓
Subjects
     ↓
Resources
     ↓
Create / Update / Delete
```

---

## 🔑 API Architecture

The backend follows a layered architecture to keep the application organized, maintainable, and scalable.

```text
Client Request
      ↓
    Routes
      ↓
  Middleware
      ↓
  Validation
      ↓
  Controller
      ↓
   Service
      ↓
    Prisma
      ↓
  PostgreSQL
```

### Example Request Flow

```text
POST /api/students/register
          ↓
        Route
          ↓
      Validation
          ↓
      Controller
          ↓
   Student Service
          ↓
        Prisma
          ↓
      PostgreSQL
```

This separation keeps routing, validation, business logic, and database operations independent from each other.

---

## 🗄️ Database

Bvoc SD uses **PostgreSQL** as the primary database and **Prisma ORM** for database access.

The database manages the application's authentication, academic structure, and learning resources.

### Main Entities

- Students
- Admins
- Programs
- Semesters
- Subjects
- Batches
- Resources

The relationships between these entities allow resources to be organized according to the academic hierarchy.

---

## ⚙️ Installation

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- PostgreSQL
- Git

Check your installed versions:

```bash
node -v
npm -v
git --version
```

---

## 📥 Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Bvoc-SD.git
```

Navigate into the project:

```bash
cd Bvoc-SD
```

---

## 🖥️ Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## ⚙️ Backend Setup

Open another terminal and navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your-secret-key"
PORT=5000
```

---

## 🗃️ Database Setup

Make sure PostgreSQL is running and the `DATABASE_URL` is correctly configured.

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate the Prisma Client:

```bash
npx prisma generate
```

If the project contains a seed script:

```bash
npx prisma db seed
```

Start the backend:

```bash
npm run dev
```

The backend API will normally be available at:

```text
http://localhost:5000
```

---

## 🔐 Environment Variables

Environment variables are used to keep sensitive configuration outside the source code.

### Backend `.env`

```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-jwt-secret"
PORT=5000
```

### Frontend `.env`

```env
VITE_API_URL="http://localhost:5000/api"
```

### Important

Never commit `.env` files to GitHub.

Add the following to `.gitignore`:

```gitignore
.env
.env.local
.env.development
.env.production
```

---

## 🧪 Development

### Start Frontend

```bash
cd frontend
npm run dev
```

### Start Backend

```bash
cd backend
npm run dev
```

### Build Frontend

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🧩 Project Principles

Bvoc SD follows several development principles:

- Separation of frontend and backend responsibilities
- Reusable React components
- Service-based backend architecture
- Centralized request validation
- Protected API routes
- Database-level constraints
- Responsive design
- Maintainable folder structure
- Environment-based configuration
- Separation of business logic and API logic

---

## 🛡️ Error Handling

The backend validates incoming requests before processing them.

For example, if a student attempts to register using an existing registration number or email address, the backend returns an appropriate error response.

Example:

```json
{
  "success": false,
  "message": "Registration number already exists"
}
```

The frontend can display this message through an alert, notification, or inline error message.

---

## 🌙 UI & UX

Bvoc SD focuses on providing a clean, modern, and responsive academic experience.

### UI Features

- Responsive layouts
- Dark/light theme
- Clear navigation
- Consistent spacing
- Accessible controls
- Loading states
- Error states
- Empty states
- Mobile-friendly interface
- Reusable components

---

## 💬 Community Discussion

Bvoc SD is designed to provide students with a dedicated community space where they can learn and communicate with each other.

Students can:

- Ask programming questions
- Discuss academic topics
- Share useful resources
- Answer questions
- Discuss projects and assignments
- Share knowledge
- Learn collaboratively

A possible discussion structure:

```text
Community
   │
   ├── Discussions
   │      ├── Questions
   │      ├── Answers
   │      └── Comments
   │
   ├── Categories
   │
   └── User Profiles
```

---

## 📈 Future Improvements

The following features can be added or expanded as the project develops:

- [ ] Community discussion system
- [ ] Real-time notifications
- [ ] Real-time chat
- [ ] File upload management
- [ ] Resource previews
- [ ] Advanced search
- [ ] Bookmark resources
- [ ] Student profiles
- [ ] Discussion reactions
- [ ] Threaded comments
- [ ] Admin analytics dashboard
- [ ] Email notifications
- [ ] Improved authentication persistence
- [ ] Automated testing
- [ ] API documentation
- [ ] CI/CD pipeline

---

## 🚀 Deployment

Bvoc SD can be deployed using separate services for the frontend, backend, and database.

### Frontend

Possible platforms:

- Vercel
- Netlify

### Backend

Possible platforms:

- Render
- Railway
- Fly.io

### PostgreSQL Database

Possible providers:

- Neon
- Supabase
- Render PostgreSQL

Production environment variables should be configured through the hosting provider rather than committed to the repository.

---

## 🔒 Security

Bvoc SD follows common security practices including:

- Password hashing
- JWT-based authentication
- Protected routes
- Input validation
- Server-side validation
- Environment variables for secrets
- Database constraints
- Role-based authorization
- Secure API responses

For production deployments, additional security measures should include:

- HTTPS
- Secure cookie configuration where applicable
- Proper CORS configuration
- Rate limiting
- Security headers
- Strong production secrets
- Regular database backups

---

## 🤝 Contributing

Contributions are welcome.

### 1. Fork the Repository

Fork the project on GitHub.

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature
```

### 3. Make Your Changes

Implement your feature, improvement, or bug fix.

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add your feature"
```

### 5. Push Your Branch

```bash
git push origin feature/your-feature
```

### 6. Create a Pull Request

Open a Pull Request on GitHub and describe the changes you made.

---

## 📄 License

This project is currently developed for educational and academic purposes.

A formal open-source license can be added when the project is prepared for public contribution.

---

## 👨‍💻 About

**Bvoc SD** is an academic platform built for the **B.Voc Software Development** community.

The goal of the project is to make academic resources easier to access, organize learning materials efficiently, and provide a collaborative environment where students can learn and share knowledge.

---

<div align="center">

### Bvoc SD

**Learn • Share • Collaborate**

⭐ If you find this project useful, consider giving the repository a star.

</div>