# Sween Car Choice Ecommerce Website — Mobile Static Version

This version is made for your situation: **no Node.js, no npm, no local backend**.

You can edit it from mobile, open `index.html` directly, and upload the same root folder to GitHub Pages.

## What works without Node/npm

- Professional red/white ecommerce design
- Home, catalog, about, inquiry and admin sections
- Product search + car make/model/year/category filters
- Product detail modal with similar products
- Cart, coupon system and order form
- Customer orders saved to Supabase when connected
- Customer inquiries saved to Supabase when connected
- Optional Formspree email notifications for orders/inquiries
- Optional Razorpay Payment Link button after order is saved
- WhatsApp order summary button after order is saved
- Admin panel for products, coupons, recent orders and inquiries
- Demo mode through localStorage if Supabase is not connected

## Files

All files are in one root folder:

- `index.html` — website structure
- `styles.css` — professional responsive UI
- `app.js` — all website logic and configuration
- `schema.sql` — Supabase tables, demo products, coupons and security policies
- `.nojekyll` — helps GitHub Pages serve files normally
- `.gitignore`

There is intentionally **no `server.js`, no `package.json`, and no npm setup** in this version.

## Instant mobile demo

1. Extract the ZIP on your phone.
2. Open `index.html` in a browser or code editor preview.
3. Use demo admin:

- Email: `demo@sweencarchoice.in`
- Password: `admin123`

Without Supabase, products/orders/inquiries are stored only in the same browser using localStorage.

## Connect Supabase from mobile

1. Open Supabase in your mobile browser.
2. Create a new project.
3. Go to SQL Editor.
4. Copy all code from `schema.sql` and run it.
5. Go to Authentication → Users and create the real owner/admin email.
6. In SQL Editor, add that admin email:

```sql
insert into public.admins (email)
values ('owner@example.com')
on conflict (email) do nothing;
```

7. Open `app.js` and paste your Supabase values:

```js
SUPABASE_URL: 'https://your-project.supabase.co',
SUPABASE_ANON_KEY: 'your-anon-key',
```

Now public customers can submit orders/inquiries, and the admin can log in to manage listings.

## Optional Formspree setup

Create a Formspree form and paste the endpoint in `app.js`:

```js
FORMSPREE_ENDPOINT: 'https://formspree.io/f/your-form-id',
```

Then every order and inquiry can also send an email notification.

## Payment without Node/npm

Because this is a static mobile-friendly version, it does **not** use Razorpay secret keys or a backend.

Use one of these simple payment flows:

### Option A — Razorpay Payment Link / Payment Page

Create a Razorpay Payment Link or Payment Page from the Razorpay dashboard, then paste it in `app.js`:

```js
RAZORPAY_PAYMENT_LINK: 'https://rzp.io/rzp/your-link',
```

After the customer places an order, the site saves the order and shows a **Pay with Razorpay** button.

### Option B — WhatsApp confirmation

If no Razorpay link is added, the site still saves the order and shows a **Send on WhatsApp** button with the full order summary.

This is easiest for a local shop because the owner can confirm stock, installation timing and final payment manually.

## Host on GitHub Pages from mobile

1. Create a new GitHub repository.
2. Upload all files from this root folder.
3. Go to repository Settings → Pages.
4. Select branch `main` and root folder.
5. Save.

Your site will work as a static website. Supabase and Formspree will still work because they run online.

## Production notes

- Replace demo placeholder product images with real shop/product photos.
- Add the real admin email to `public.admins`.
- Use Supabase Auth for owner/admin login.
- Use Razorpay Payment Links for no-code mobile payment collection.
- Add real shipping, return, warranty and privacy policy before accepting serious online orders.
- Keep the Supabase `service_role` key private. Do not paste it in this static website.
