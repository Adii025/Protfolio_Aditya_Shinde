# Setup Guide — Fixing the Supabase Error & Running Your Portfolio

## Why the error happened

This portfolio loads almost everything dynamic (your projects, certificates,
tech stack, and comments) from a **Supabase** database. The code was reading
two environment variables that didn't exist anywhere in the project:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Because there was no `.env.local` file, those variables were `undefined`,
and `@supabase/ssr` refuses to create a client without them — which is the
exact error you saw.

## What I changed

1. Added a `.env.local` file (empty placeholders) for you to fill in.
2. Made `src/lib/supabase.ts`, `src/lib/supabaseServer.ts`, and `middleware.ts`
   fall back to harmless placeholder values instead of crashing if the env
   vars are missing — so the site will now boot even before you've connected
   a real database (project/certificate/tech-stack sections will just be
   empty until you do).
3. Added `seed.sql` with your real projects, tech stack, and certificate
   titles (pulled from your resume) ready to insert once your database
   exists.
4. Updated all the hardcoded personal info across the site (name, bio,
   skills, footer, contact links, page title) to match your resume.

## Steps to get it fully working

### 1. Install dependencies
```bash
npm install
```

### 2. Create a free Supabase project
Go to https://supabase.com → New project. Wait ~2 minutes for it to spin up.

### 3. Get your API keys
In your Supabase project: **Settings → API**
- Copy the **Project URL**
- Copy the **anon public** key

Paste them into `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Create the database tables
In Supabase: **SQL Editor → New query** → paste the entire contents of
`backup.sql` from this project → Run. This creates the `projects`,
`certificates`, `comments`, and `tech_stack` tables.

### 5. Add your real content
Run `seed.sql` the same way (SQL Editor → New query → paste → Run). This
inserts your 3 resume projects, your tech stack, and your certificate
titles. You can also add/edit everything later from `/admin` once you set
up an admin login (see below), or directly in the Supabase Table Editor.

### 6. Set up admin login (optional)
The `/admin` routes let you manage projects/certificates/comments through a
UI instead of SQL. They're protected by Supabase Auth. In Supabase:
**Authentication → Users → Add user**, create yourself a user with email +
password, then log in at `/admin/login`.

### 7. Run the dev server
```bash
npm run dev
```
Visit http://localhost:3000 — the Supabase error should be gone, and your
real project/skills data will appear once steps 4–5 are done.

## What I personalized for you

- Hero, About, Navbar, browser tab title, and footer now show **Aditya
  Shinde** instead of the template's original name.
- About section bio rewritten using your resume summary.
- Hero skills tags updated to Java / Spring Boot / React.js / SQL.
- "Download CV" button now points to your resume PDF (included in
  `/public/Aditya_Balu_Shinde_Resume.pdf`).
- Contact section's social links updated to your real GitHub
  (github.com/Adii025), LinkedIn, and email — the previous template's
  Instagram/YouTube/TikTok links (belonging to someone else) were removed.
- `seed.sql` added with your 3 resume projects (Vani AI Voice Assistant,
  Autonomous Car System, Path Following Robot), your tech stack, and your
  certificate titles, ready to load into Supabase.

## Note on the "Work Experience" section

Your resume includes a 6-month Java Full Stack internship at
QSpiders/JSpiders with specific bullet points (SQL optimization, JDBC,
OOP refactors, etc.). This portfolio template doesn't currently have a
dedicated "Experience" section in its layout — projects and certificates are
shown, but not a work-history timeline. If you'd like, I can add a new
Experience section to the page; just ask and I'll build it in the same
visual style as the rest of the site.
