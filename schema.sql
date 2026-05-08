-- Sween Car Choice ecommerce schema for Supabase
-- Run this inside Supabase SQL Editor.
-- Then create a Supabase Auth user for your admin email and add that email to public.admins.

create extension if not exists pgcrypto;

create table if not exists public.admins (
  email text primary key,
  created_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text,
  brand text,
  category text not null,
  price numeric(12,2) not null default 0 check (price >= 0),
  compare_price numeric(12,2) default 0 check (compare_price >= 0),
  qty integer not null default 0 check (qty >= 0),
  make text default 'Any',
  model text default 'Universal',
  year_from integer default 2010,
  year_to integer default 2026,
  image_url text,
  description text,
  specs jsonb default '{}'::jsonb,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  type text not null check (type in ('percent', 'flat')),
  value numeric(12,2) not null check (value > 0),
  min_cart numeric(12,2) default 0,
  active boolean default true,
  expires_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  customer_reason text,
  customer_address text,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric(12,2) not null default 0,
  discount numeric(12,2) not null default 0,
  shipping numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  coupon_code text,
  payment_status text default 'pending',
  razorpay_payment_id text,
  razorpay_order_id text,
  created_at timestamptz default now()
);


create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  reason text not null,
  product_interest text,
  car_details text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

-- Storage bucket for uploaded product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

-- Replace this email with the real owner/admin email after creating the Supabase Auth user.
insert into public.admins (email)
values ('demo@sweencarchoice.in')
on conflict (email) do nothing;

insert into public.products (name, slug, brand, category, price, compare_price, qty, make, model, year_from, year_to, image_url, description, specs, featured)
values
('9 inch Android Stereo with Wireless CarPlay', '9-inch-android-stereo-wireless-carplay', 'Sween Premium', 'Audio', 14999, 18999, 6, 'Hyundai', 'Creta', 2018, 2026, 'https://placehold.co/900x650/f3f4f6/111827?text=Android+Stereo', 'Premium Android infotainment upgrade with wireless CarPlay, Android Auto, steering controls and HD display support.', '{"Warranty":"1 year","Installation":"Available in Patiala","Display":"9 inch HD","Connectivity":"Wireless CarPlay / Android Auto"}', true),
('High Bass Active Subwoofer Tube', 'high-bass-active-subwoofer-tube', 'BassX', 'Audio', 7999, 9999, 4, 'Any', 'Universal', 2010, 2026, 'https://placehold.co/900x650/f3f4f6/111827?text=Active+Subwoofer', 'Compact bass tube with built-in amplifier for deep punchy sound without taking over the boot space.', '{"Power":"600W peak","Fitment":"Universal","Warranty":"6 months"}', true),
('GPS Vehicle Tracker with Mobile App', 'gps-vehicle-tracker-mobile-app', 'TrackPro', 'GPS', 3499, 4999, 9, 'Any', 'Universal', 2008, 2026, 'https://placehold.co/900x650/f3f4f6/111827?text=GPS+Tracker', 'Live vehicle tracking, trip history and geo-fence alerts for personal and commercial vehicles.', '{"App":"Android / iOS","Alerts":"Ignition, geo-fence","Fitment":"Universal"}', true),
('Luxury Leatherette Seat Cover Set', 'luxury-leatherette-seat-cover-set', 'AutoFit', 'Seat Covers', 11999, 15499, 3, 'Mahindra', 'Thar', 2020, 2026, 'https://placehold.co/900x650/f3f4f6/111827?text=Seat+Covers', 'Custom-fit leatherette seat covers with premium stitch pattern, foam padding and showroom finish.', '{"Material":"Leatherette","Fitment":"Custom Thar 2020+","Cleaning":"Easy wipe"}', false),
('Projector LED Fog Lamp Kit', 'projector-led-fog-lamp-kit', 'LumaDrive', 'Lighting', 5999, 7499, 7, 'Maruti Suzuki', 'Swift', 2017, 2026, 'https://placehold.co/900x650/f3f4f6/111827?text=LED+Fog+Lamp', 'Bright projector fog lamp setup for improved night visibility and a premium front profile.', '{"Beam":"Projector","Color":"White / Yellow","Installation":"Bumper fitment"}', false),
('4x4 Off-road LED Light Bar', '4x4-offroad-led-light-bar', 'TrailMax', '4x4', 8999, 11999, 2, 'Mahindra', 'Thar', 2015, 2026, 'https://placehold.co/900x650/f3f4f6/111827?text=4x4+Light+Bar', 'Heavy-duty LED light bar for adventure builds, highway presence and off-road visibility.', '{"Length":"20 inch","Housing":"Weather-resistant","Fitment":"Roof / bumper mount"}', true),
('HD Reverse Camera with Night Vision', 'hd-reverse-camera-night-vision', 'ParkSafe', 'Accessories', 2299, 2999, 12, 'Any', 'Universal', 2008, 2026, 'https://placehold.co/900x650/f3f4f6/111827?text=Reverse+Camera', 'Water-resistant HD reverse camera with guide lines and night visibility support.', '{"Resolution":"HD","NightVision":"Yes","Fitment":"Universal"}', false),
('RGB Ambient Light Kit', 'rgb-ambient-light-kit', 'GlowRide', 'Lighting', 6499, 8499, 5, 'Hyundai', 'Creta', 2020, 2026, 'https://placehold.co/900x650/f3f4f6/111827?text=Ambient+Light', 'App-controlled interior ambient lighting kit with smooth colour modes and clean wire hiding.', '{"Control":"Mobile app","Modes":"Music sync","Installation":"Dashboard + doors"}', false)
on conflict do nothing;

insert into public.coupons (code, type, value, min_cart, active)
values
('SWEEN10', 'percent', 10, 5000, true),
('AUDIO500', 'flat', 500, 8000, true)
on conflict (code) do nothing;

alter table public.admins enable row level security;
alter table public.products enable row level security;
alter table public.coupons enable row level security;
alter table public.orders enable row level security;
alter table public.inquiries enable row level security;

-- Helper check: current signed-in user must exist in public.admins.
drop policy if exists "Admins can read admin list" on public.admins;
create policy "Admins can read admin list"
on public.admins for select
to authenticated
using (email = auth.email());

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
on public.products for select
to anon, authenticated
using (true);

drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products"
on public.products for insert
to authenticated
with check (exists (select 1 from public.admins a where a.email = auth.email()));

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products"
on public.products for update
to authenticated
using (exists (select 1 from public.admins a where a.email = auth.email()))
with check (exists (select 1 from public.admins a where a.email = auth.email()));

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products"
on public.products for delete
to authenticated
using (exists (select 1 from public.admins a where a.email = auth.email()));

drop policy if exists "Public can read active coupons" on public.coupons;
create policy "Public can read active coupons"
on public.coupons for select
to anon, authenticated
using (active = true and (expires_at is null or expires_at > now()));

drop policy if exists "Admins can insert coupons" on public.coupons;
create policy "Admins can insert coupons"
on public.coupons for insert
to authenticated
with check (exists (select 1 from public.admins a where a.email = auth.email()));

drop policy if exists "Admins can update coupons" on public.coupons;
create policy "Admins can update coupons"
on public.coupons for update
to authenticated
using (exists (select 1 from public.admins a where a.email = auth.email()))
with check (exists (select 1 from public.admins a where a.email = auth.email()));

drop policy if exists "Admins can delete coupons" on public.coupons;
create policy "Admins can delete coupons"
on public.coupons for delete
to authenticated
using (exists (select 1 from public.admins a where a.email = auth.email()));

drop policy if exists "Anyone can place orders" on public.orders;
create policy "Anyone can place orders"
on public.orders for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read orders" on public.orders;
create policy "Admins can read orders"
on public.orders for select
to authenticated
using (exists (select 1 from public.admins a where a.email = auth.email()));


drop policy if exists "Anyone can submit inquiries" on public.inquiries;
create policy "Anyone can submit inquiries"
on public.inquiries for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read inquiries" on public.inquiries;
create policy "Admins can read inquiries"
on public.inquiries for select
to authenticated
using (exists (select 1 from public.admins a where a.email = auth.email()));

drop policy if exists "Admins can update inquiries" on public.inquiries;
create policy "Admins can update inquiries"
on public.inquiries for update
to authenticated
using (exists (select 1 from public.admins a where a.email = auth.email()))
with check (exists (select 1 from public.admins a where a.email = auth.email()));

-- Storage policies for product images
drop policy if exists "Public can read product images" on storage.objects;
create policy "Public can read product images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'product-images');

drop policy if exists "Admins can upload product images" on storage.objects;
create policy "Admins can upload product images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-images' and exists (select 1 from public.admins a where a.email = auth.email()));

drop policy if exists "Admins can update product images" on storage.objects;
create policy "Admins can update product images"
on storage.objects for update
to authenticated
using (bucket_id = 'product-images' and exists (select 1 from public.admins a where a.email = auth.email()))
with check (bucket_id = 'product-images' and exists (select 1 from public.admins a where a.email = auth.email()));

drop policy if exists "Admins can delete product images" on storage.objects;
create policy "Admins can delete product images"
on storage.objects for delete
to authenticated
using (bucket_id = 'product-images' and exists (select 1 from public.admins a where a.email = auth.email()));
