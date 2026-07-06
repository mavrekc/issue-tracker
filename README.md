## IssueTracker
A lightweight issue-tracking and project-management application built on Next.js (App Router) with TypeScript and Tailwind. It provides user authentication, CRUD issue management, and a responsive UI so teams can plan, track, and resolve work quickly.

## Features

- User authentication (sign up, sign in, sign out)
- Issue management (create, update, delete)
- Modern UI with Tailwind CSS
- Responsive design

## Tech Stack

- [Next.js 15+](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [PostgreSQL](https://www.postgresql.org/) for database

### Prerequisites

- Node.js 22+ and npm/yarn
- PostgreSQL database (or use a service like [Neon](https://neon.tech/))

## Getting Started

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd issue-tracker
npm install
```

### 2. Create a local database

```bash
createdb issue_tracker
```

Or via `psql`:

```sql
CREATE DATABASE issue_tracker;
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Then edit `.env` and set `DATABASE_URL` to your local database, and set `JWT_SECRET` to a random string of at least 32 characters.

### 4. Run database migrations

```bash
npm run db:migrate
```

This applies the SQL migrations in `drizzle/` to create the tables. After changing the schema (`db/schema.ts`), run `npm run db:generate` to regenerate the migration files.

### 5. Seed demo data

```bash
npm run seed
```

This creates two demo accounts, `admin@example.com` and `user@example.com`, both with password `password123`.

### 6. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

> Tip: run `npm run db:studio` to browse the database with Drizzle Studio.

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `app/api/` - API routes
- `app/components/` - Reusable UI components
- `lib/` - Utility functions and libraries

## License

This project is licensed under the MIT License.
