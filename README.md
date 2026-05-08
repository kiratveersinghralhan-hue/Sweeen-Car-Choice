# Sween Car Choice Ecommerce Website — Polished Red/White Version

Professional ecommerce demo for **Sween Car Choice, Patiala**.

This version keeps the clean marketplace-style layout and adds a restrained red/white brand accent inspired by the shop branding, plus a short professional intro animation.

## Features

- Minimal professional ecommerce homepage with red/white brand accents
- About section with shop/location copy
- Dynamic catalog with search, make, model, year and category filters
- Product cards with price, stock, fitment and quick actions
- Product detail modal with specs and similar products
- Cart, quantity controls, coupon system, customer reason field and checkout form
- Admin login panel
- Add/edit/delete product listings
- Product image URL or Supabase Storage upload
- Add/delete coupons
- Inquiry form for product help, fitment support, quotations and installation appointments
- Orders and inquiries saved to Supabase when connected, and localStorage in demo mode
- Optional Formspree endpoint for order/inquiry email notifications
- Supabase database integration
- Razorpay Checkout integration with a secure Node/Express order server
- Light mode by default, optional dark mode through the Theme button

## Files

All files are in one main root folder. There are no asset subfolders.

- `index.html` — main website
- `styles.css` — professional responsive ecommerce UI
- `app.js` — frontend logic, Supabase client, cart, admin, checkout
- `server.js` — secure Razorpay order + verification backend
- `schema.sql` — Supabase tables, seed products, coupons, RLS policies
- `.env.example` — server environment variables
- `package.json` — Node backend dependencies
- `.gitignore` — excludes `.env` and dependencies

## Instant demo without setup

Open `index.html` in a browser.

It will run with local demo products and demo admin:

- Email: `demo@sweencarchoice.in`
- Password: `admin123`

In demo mode, checkout stores a local demo order. Real payments need Razorpay keys and the included backend.

## Supabase setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run all SQL from `schema.sql`.
4. Create an Auth user for the real admin email.
5. Replace or add the admin email in `public.admins`:

```sql
insert into public.admins (email)
values ('owner@example.com')
on conflict (email) do nothing;
```

6. In `app.js`, paste:

```js
SUPABASE_URL: 'https://your-project.supabase.co',
SUPABASE_ANON_KEY: 'your-anon-key',
```

The schema now includes `orders` and `inquiries`. Public visitors can insert records, while only registered admin emails can read them in the owner panel.

## Optional Formspree setup

In `app.js`, paste your Formspree endpoint:

```js
FORMSPREE_ENDPOINT: 'https://formspree.io/f/your-form-id',
```

When set, the website will send a Formspree notification whenever a customer places an order or submits an inquiry. Supabase storage still remains the main database record.

## Razorpay setup

Razorpay payments need a backend because the key secret must never be placed in frontend JavaScript.

1. Copy `.env.example` to `.env`.
2. Add your Razorpay test/live keys:

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-only-on-server
ALLOWED_ORIGIN=http://localhost:8787,https://your-github-pages-url.github.io
```

3. Install and run:

```bash
npm install
npm start
```

4. In `app.js`, set:

```js
RAZORPAY_KEY_ID: 'rzp_test_xxxxxxxxxxxxxx',
API_BASE_URL: 'http://localhost:8787'
```

For production, deploy `server.js` on Render, Railway, Fly.io, VPS, etc. Then set `API_BASE_URL` to that backend URL.

## GitHub Pages hosting

GitHub Pages can host the frontend files only. It cannot run `server.js`.

For a real checkout:

- Host `index.html`, `styles.css`, and `app.js` on GitHub Pages.
- Host `server.js` on a Node backend provider.
- Put the backend URL in `CONFIG.API_BASE_URL` in `app.js`.

## Important production checklist

- Use Razorpay test keys first.
- Keep `RAZORPAY_KEY_SECRET` and `SUPABASE_SERVICE_ROLE_KEY` only on the server.
- Add the real owner email to `public.admins`.
- Replace demo placeholder images with real product photos and logo/brand assets.
- Add real shipping, cancellation, refund, warranty and privacy policy pages before going live.
- Verify GST/invoice requirements with a qualified adult/professional before accepting real online orders.
