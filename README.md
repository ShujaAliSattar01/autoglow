# AutoGlow

Premium mobile car wash & detailing marketing site for Lahore, Pakistan, built with Next.js (App Router), TypeScript, Tailwind CSS, Supabase and Nodemailer.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site works out of the box with no environment variables configured: testimonials fall back to seed data, the booking form still validates and shows a success state, and email/WhatsApp notifications are simply skipped with a console warning.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values you have:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public Supabase project credentials. |
| `SUPABASE_SECRET_KEY` | **Server-only.** Used by API routes to write testimonials/appointments and upload review images. Never exposed to the browser. |
| `CONTACT_EMAIL` | Inbox that receives new booking notification emails. |
| `SMTP_USER` / `SMTP_APP_PASSWORD` | Gmail address + [App Password](https://myaccount.google.com/apppasswords) used to send booking emails via Nodemailer. |
| `WHATSAPP_CLOUD_ACCESS_TOKEN` / `WHATSAPP_CLOUD_PHONE_NUMBER_ID` / `WHATSAPP_OWNER_NUMBER` | Optional. WhatsApp Business Cloud API credentials for automated owner notifications on new bookings. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Number used for the floating WhatsApp button and "WhatsApp Us" links (international format, digits only, e.g. `923001234567`). |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used in SEO metadata. |

> **Note on WhatsApp:** a plain `wa.me` link can only pre-fill a message for a visitor to send themselves. Automatically notifying the AutoGlow owner when a booking comes in requires the WhatsApp Business **Cloud API** (paid/managed by Meta). If those credentials aren't set, the booking flow still completes normally and instead shows the customer a "Confirm on WhatsApp" button with a pre-filled message.

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run:

```sql
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  vehicle text,
  area text,
  rating smallint not null check (rating between 1 and 5),
  review text not null,
  image_url text,
  status text not null default 'approved' check (status in ('approved', 'pending')),
  created_at timestamptz not null default now()
);

create index if not exists testimonials_status_created_at_idx
  on public.testimonials (status, created_at desc);

alter table public.testimonials enable row level security;

-- Public read of approved reviews only. All writes go through the
-- server-side API route using the secret key, which bypasses RLS.
create policy "Public can read approved testimonials"
  on public.testimonials for select
  using (status = 'approved');
```

```sql
-- Optional: persist appointment/booking submissions.
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  vehicle_type text not null,
  vehicle_model text not null,
  service text not null,
  preferred_date date not null,
  preferred_time text not null,
  address text not null,
  area text not null,
  notes text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.appointments enable row level security;
-- No public policies are added: appointments are only written/read via the
-- server-side API route using the secret key.
```

3. In **Storage**, create a public bucket named `testimonial-images` for review photo uploads.
4. Copy your project URL, publishable key, and secret key into `.env.local`.

To enable moderation later, change the API route's insert `status` from `"approved"` to `"pending"` and add an admin-only policy/view for approving rows.

## Quality Checks

```bash
npm run lint
npm run build
```

## Image Assets

Brand imagery lives in `public/images/`:

```
/images/autoglow-logo.png
/images/hero-car-wash.png
/images/express-wash.png
/images/wash-and-wax.png
/images/complete-detailing.png
/images/ceramic-protection.png
/images/before-after/exterior-before.png
/images/before-after/exterior-after.png
/images/before-after/interior-before.png
/images/before-after/interior-after.png
/images/before-after/ceramic-before.png
/images/before-after/ceramic-after.png
```

Any missing image gracefully falls back to a placeholder in the UI instead of breaking the layout.
