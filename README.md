# PristineClean — Premium Cleaning Services

A production-ready, enterprise-grade full-stack website for a premium cleaning company. Built with Next.js 16, TypeScript, Tailwind CSS v4, Prisma, and modern tooling.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, CSS Variables
- **Typography:** Manrope + Cormorant Garamond (via Google Fonts)
- **UI:** Custom components built on Radix UI primitives
- **Forms:** React Hook Form + Zod validation
- **Animations:** Intersection Observer, Canvas, CSS transitions
- **Database:** PostgreSQL + Prisma ORM v6
- **Auth:** Better Auth
- **Email:** Resend + React Email
- **Storage:** UploadThing
- **Linting:** ESLint + Prettier

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Required variables:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/pristineclean?schema=public"

# Better Auth
BETTER_AUTH_SECRET="generate-a-random-32-char-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Resend (Optional - for email)
RESEND_API_KEY="re_..."
RESEND_DOMAIN="yourdomain.com"

# UploadThing (Optional - for image uploads)
UPLOADTHING_SECRET="sk_..."
UPLOADTHING_APP_ID="..."
```

### 3. Database Setup

```bash
# Push schema to database
npx prisma db push

# Seed initial data (optional)
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── (site)/          # Public website routes
│   │   ├── page.tsx     # Home page
│   │   ├── about/
│   │   ├── services/
│   │   ├── gallery/
│   │   ├── pricing/
│   │   ├── quote-booking/
│   │   ├── testimonials/
│   │   ├── faq/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── privacy-policy/
│   │   └── terms/
│   ├── admin/           # Admin dashboard
│   ├── api/             # API routes
│   ├── layout.tsx       # Root layout
│   ├── globals.css      # Global styles + theme
│   ├── sitemap.ts       # Dynamic sitemap
│   ├── robots.ts        # Robots configuration
│   └── not-found.tsx    # 404 page
├── components/
│   ├── ui/              # Base UI components (Button, Input, Card, etc.)
│   ├── layout/          # Navbar, Footer
│   ├── home/            # Home page sections
│   ├── services/        # Service page components
│   ├── quote/           # Multi-step quote wizard
│   ├── gallery/         # Gallery with lightbox
│   ├── testimonials/    # Testimonial cards
│   ├── faq/             # FAQ accordion + search
│   ├── blog/            # Blog list + detail
│   ├── admin/           # Dashboard components
│   └── common/          # Shared components
├── actions/             # Server Actions
├── lib/                 # Utilities, config, clients
├── hooks/               # Custom React hooks
├── schemas/             # Zod validation schemas
├── types/               # TypeScript types
├── utils/               # Formatting helpers
├── emails/              # Email templates (React Email)
└── proxy.ts             # Next.js 16 Proxy (Middleware)
```

## Key Features

### Quote Booking System

Multi-step wizard with 10 steps:

1. Select service type
2. Choose residential/commercial
3. Property details (bedrooms, bathrooms, sq ft)
4. Cleaning frequency
5. Preferred date & time
6. Address input
7. Extra services
8. Image upload
9. Customer information
10. Review & submit

No payment collected — generates a quote request stored in PostgreSQL.

### Admin Dashboard

Secure dashboard with:

- Overview stats
- Quote management with filtering
- Customer directory
- Services, Gallery, Testimonials, Blog, FAQ management
- Site settings

### Email Workflow

- Customer receives confirmation email on quote submission
- Admin receives notification with customer details

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

Deploy on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variables in Vercel dashboard.

## SEO

- Dynamic metadata per page
- Structured data (Schema.org)
- OpenGraph & Twitter Cards
- Auto-generated sitemap.xml
- robots.txt
- Breadcrumbs

## License

Private — All rights reserved.
