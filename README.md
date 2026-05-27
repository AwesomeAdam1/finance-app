# Finance SaaS Platform

A modern personal finance dashboard for tracking accounts, categories, transactions, spending trends, and subscription-gated premium workflows. The app combines a polished Next.js dashboard with a type-safe Hono API, Clerk authentication, Drizzle ORM, Neon Postgres, Plaid bank imports, CSV transaction imports, and Lemon Squeezy subscription checkout.

## Highlights

- Authenticated finance dashboard with income, expenses, remaining balance, category breakdowns, and charted transaction history.
- Account, category, and transaction CRUD with bulk delete flows and optimistic client refreshes through TanStack Query.
- CSV transaction import with column mapping, account selection, and bulk creation.
- Plaid Link integration for connecting bank accounts and importing accounts, categories, and synced transactions.
- Lemon Squeezy subscription checkout, customer portal routing, signed webhook handling, and premium paywall hooks.
- PostgreSQL schema and migrations managed with Drizzle ORM.
- Component-driven UI built with Tailwind CSS, Radix primitives, Recharts, and shadcn-style local components.

## Tech Stack

- Framework: Next.js 15, React 19, App Router
- API: Hono mounted under `/api`
- Auth: Clerk
- Database: Neon Postgres with Drizzle ORM
- Data fetching: TanStack Query
- Validation: Zod and drizzle-zod
- Payments: Lemon Squeezy
- Banking: Plaid sandbox
- Styling: Tailwind CSS, Radix UI, lucide-react, react-icons
- Charts and tables: Recharts, TanStack Table
- Runtime/package manager: Bun

## App Structure

```txt
app/
  (auth)/                    Clerk sign-in and sign-up routes
  (dashboard)/               Protected dashboard pages
  api/[[...route]]/          Hono API routes for finance, Plaid, and subscriptions
components/                  Shared dashboard, chart, table, and UI components
db/                          Drizzle schema and database client
drizzle/                     Generated SQL migrations and migration metadata
features/                    Feature modules for accounts, categories, transactions, Plaid, summary, subscriptions
lib/                         Shared utilities and API clients
providers/                   App-level React providers
scripts/                     Database migration and seed scripts
```

## Getting Started

### Prerequisites

- Bun installed locally
- A Neon Postgres database
- Clerk application credentials
- Plaid sandbox credentials
- Lemon Squeezy API credentials if you want subscription checkout and webhooks

### Install Dependencies

```bash
bun install
```

### Configure Environment

Create `.env.local` in the project root. The app reads the following values:

```bash
DATABASE_URL=
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

PLAID_CLIENT_TOKEN=
PLAID_SECRET_TOKEN=

LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_STORE_ID=
LEMONSQUEEZY_PRODUCT_ID=
LEMONSQUEEZY_WEBHOOK_SECRET=
```

`NEXT_PUBLIC_APP_URL` is used by the typed Hono client and Lemon Squeezy redirect URLs. For local webhooks, expose your dev server with a tunnel and point Lemon Squeezy to:

```txt
https://your-public-url.com/api/subscriptions/webhook
```

### Set Up the Database

Generate a migration after schema changes:

```bash
bun run db:generate
```

Apply migrations:

```bash
bun run db:migrate
```

Open Drizzle Studio:

```bash
bun run db:studio
```

Optional seed data is available:

```bash
bun run db:seed
```

Note: the seed script currently uses a fixed Clerk user id. Update `SEED_USER_ID` in `scripts/seed.ts` before seeding data for your own account.

### Run the App

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
bun run dev          # Start the Next.js dev server with Turbopack
bun run build        # Create a production build
bun run start        # Start the production server
bun run lint         # Run Next.js linting
bun run db:generate  # Generate Drizzle migrations from schema changes
bun run db:migrate   # Apply migrations to the configured database
bun run db:studio    # Open Drizzle Studio
bun run db:seed      # Seed demo accounts, categories, and transactions
```

## Core Workflows

### Dashboard Analytics

The dashboard reads from `/api/summary` and displays current-period totals, percentage changes against the previous period, income and expense trends, and top spending categories. Filters are driven by query parameters for date range and account selection.

### Accounts and Categories

Users can create, edit, delete, and bulk delete their own accounts and categories. All API routes are scoped by Clerk user id and protected through Hono Clerk middleware.

### Transactions

Transactions support manual creation, editing, deletion, bulk deletion, and CSV import. CSV import expects the user to map at least these fields:

```txt
amount
date
payee
```

Imported dates are parsed with the `yyyy-MM-dd HH:mm:ss` format.

### Plaid Sync

The Plaid integration creates a sandbox link token, exchanges the public token for an access token, stores the connected bank, imports Plaid accounts and categories, then syncs initial transactions into the local database. Disconnecting a bank removes the stored connection and Plaid-derived accounts/categories.

### Subscriptions and Paywall

Lemon Squeezy powers checkout and customer portal access. Subscription records are created and updated through signed webhook events. Premium checks currently gate CSV import and non-area chart variants through the shared `usePaywall` hook.

## API Overview

All routes are mounted under `/api`.

```txt
/api/accounts
/api/categories
/api/transactions
/api/summary
/api/plaid
/api/subscriptions
```

The Hono app exports `AppType`, which is consumed by the client helper in `lib/hono.ts` for typed API calls.

## Data Model

The main tables are:

- `accounts`: user-owned financial accounts, optionally linked to Plaid account ids.
- `categories`: user-owned spending categories, optionally linked to Plaid category ids.
- `transactions`: dated amounts tied to accounts and optionally categories.
- `connected_banks`: Plaid access tokens per user.
- `subscriptions`: Lemon Squeezy subscription id, status, and user mapping.

Amounts are stored as integer milliunits to avoid floating point drift.

## Deployment Notes

- Deploy the Next.js app to a Node-compatible host such as Vercel.
- Set every environment variable from `.env.local` in the production environment.
- Run `bun run db:migrate` against the production database before serving traffic.
- Configure the Lemon Squeezy webhook URL to point at `/api/subscriptions/webhook`.
- Keep Plaid in sandbox for development and switch credentials/environment intentionally before production use.

## Development Notes

- Prefer editing `db/schema.ts`, then running `bun run db:generate` to create migrations.
- API handlers live in `app/api/[[...route]]` and are composed in `route.ts`.
- Feature-specific hooks and components live under `features/<feature>`.
- Shared UI primitives live in `components/ui`.
- This project intentionally keeps financial data scoped by Clerk user id at the API/database query layer.
