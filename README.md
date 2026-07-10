<div align="center">

# 🌐 Aditya Balu Shinde  — Personal Portfolio

**A modern, animated personal portfolio built with Next.js 16, Supabase & Three.js**

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)

</div>

---

## ✨ Features

- 🎬 Animated Welcome Screen with smooth intro transition
- 🌌 3D Interactive Background using Three.js & React Three Fiber
- 👤 About Section with live project & certificate counters
- 📁 Projects Showcase with detail pages
- 🏆 Certificates Section with image preview & URL links
- 🛠️ Tech Stack Grid with logo display
- 💬 Contact & Comments Section
- 🔐 Protected Admin Panel to manage all content
- ⚡ Real-time data powered by Supabase
- 📱 Fully Responsive — mobile & desktop

---

## 🛠️ Tech Stack

| Category     | Technology                          |
|--------------|-------------------------------------|
| Framework    | Next.js 16.2.4 (App Router)         |
| Language     | TypeScript 5                        |
| Styling      | Tailwind CSS 3                      |
| Animations   | Framer Motion, GSAP                 |
| 3D           | Three.js, React Three Fiber, Drei   |
| Database     | Supabase (PostgreSQL)               |
| Storage      | Supabase Storage                    |
| Icons        | Lucide React, React Icons           |
| Alerts       | SweetAlert2                         |
| Deployment   | Netlify                             |

---

## 🚀 Getting Started

### 1. Clone the repository

git clone https://github.com/YOURUSERNAME/portfolio.git
cd portfolio

### 2. Install dependencies

npm install

### 3. Set up environment variables

Create a .env.local file in the root folder:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

### 4. Set up Supabase tables

Run this SQL in your Supabase SQL Editor:

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  live_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE certificates (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT,
  certificate_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tech_stacks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

Also create a public Storage bucket named certificates in Supabase Storage.

### 5. Run the development server

npm run dev

Open http://localhost:3000 in your browser.

---

## 📂 Project Structure

src/
├── app/
│   ├── admin/
│   │   ├── certificates/
│   │   ├── comments/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── projects/
│   │   └── tech/
│   ├── portfolio/
│   │   └── [id]/
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Hero.tsx
│   │   ├── PortfolioShowcase.tsx
│   │   ├── PortfolioCard.tsx
│   │   └── contact/
│   ├── band/
│   ├── ui/
│   ├── AnimatedBackground.tsx
│   └── WelcomeScreen.tsx
├── hooks/
│   ├── usePortfolio.ts
│   └── useComments.ts
└── lib/
    ├── supabase.ts
    ├── supabaseServer.ts
    ├── portfolioService.ts
    └── commentService.ts

---

## 🌍 Deployment on Netlify

1. Create a netlify.toml in the root folder:

[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

2. Push your code to GitHub
3. Go to netlify.com → Add new site → Import from Git
4. Set build settings:
   - Build command: npm run build
   - Publish directory: .next
5. Add environment variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
6. Click Deploy 🚀

---

## 🔐 Admin Panel

Access the admin panel at /admin/login:

- Add / Edit / Delete Projects
- Add / Edit / Delete Certificates (image + URL)
- Add / Edit / Delete Tech Stack
- View & manage Comments

---

## 📄 License

This project is open for inspiration. Feel free to use it as a reference for your own portfolio!

---

Made with ❤️ by Aditya Balu Shinde
