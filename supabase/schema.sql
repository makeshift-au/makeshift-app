-- ============================================================
-- MAKESHIFT DATABASE SCHEMA
-- Run this in Supabase SQL Editor (dashboard.supabase.com → SQL Editor)
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text not null default 'buyer' check (role in ('buyer', 'artist', 'admin')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- ARTISTS
-- ============================================================
create table public.artists (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete set null,
  slug text unique not null,
  name text not null,
  discipline text not null,
  location text not null,
  tagline text,
  bio text,
  instagram text,
  website text,
  bg text not null default 'bg-acid',
  hero_url text,
  avatar_url text,
  featured boolean not null default false,
  commissions boolean not null default false,
  price_range text,
  status text not null default 'live' check (status in ('live', 'paused', 'onboarding', 'closed')),
  stripe_account_id text,
  stripe_onboarded boolean not null default false,
  founding_artist boolean not null default false,
  fee_rate numeric(4,2) not null default 10.00,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.artists enable row level security;

create policy "Artists are viewable by everyone"
  on artists for select using (true);

create policy "Artists can update own record"
  on artists for update using (auth.uid() = profile_id);

create index idx_artists_discipline on artists(discipline);
create index idx_artists_slug on artists(slug);
create index idx_artists_featured on artists(featured) where featured = true;

-- ============================================================
-- CATEGORIES
-- ============================================================
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  label text not null,
  bg text not null default 'bg-acid',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

create policy "Categories are viewable by everyone"
  on categories for select using (true);

-- ============================================================
-- LISTINGS
-- ============================================================
create table public.listings (
  id uuid default uuid_generate_v4() primary key,
  artist_id uuid references public.artists(id) on delete cascade not null,
  title text not null,
  description text,
  price numeric(10,2) not null,
  price_type text not null default 'fixed' check (price_type in ('fixed', 'from')),
  material text,
  dimensions text,
  lead_time text,
  status text not null default 'live' check (status in ('draft', 'live', 'sold', 'paused')),
  image_urls text[] default '{}',
  tags text[] default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.listings enable row level security;

create policy "Listings are viewable by everyone"
  on listings for select using (true);

create policy "Artists can manage own listings"
  on listings for all using (
    artist_id in (
      select id from artists where profile_id = auth.uid()
    )
  );

create index idx_listings_artist on listings(artist_id);
create index idx_listings_status on listings(status) where status = 'live';

-- ============================================================
-- ORDERS
-- ============================================================
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  order_number text unique not null,
  listing_id uuid references public.listings(id),
  artist_id uuid references public.artists(id) not null,
  buyer_email text not null,
  buyer_name text,
  shipping_address jsonb,
  amount numeric(10,2) not null,
  platform_fee numeric(10,2) not null,
  artist_payout numeric(10,2) not null,
  stripe_payment_intent_id text,
  stripe_transfer_id text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'shipped', 'delivered', 'refunded', 'disputed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Artists can view own orders"
  on orders for select using (
    artist_id in (
      select id from artists where profile_id = auth.uid()
    )
  );

create policy "Admins can view all orders"
  on orders for select using (
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- ENQUIRIES (commissions)
-- ============================================================
create table public.enquiries (
  id uuid default uuid_generate_v4() primary key,
  artist_id uuid references public.artists(id) on delete cascade not null,
  name text not null,
  email text not null,
  brief text not null,
  budget text,
  reference_urls text[] default '{}',
  timeline text,
  status text not null default 'new' check (status in ('new', 'replied', 'deposit_paid', 'in_progress', 'completed', 'declined', 'no_reply')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.enquiries enable row level security;

create policy "Artists can view own enquiries"
  on enquiries for select using (
    artist_id in (
      select id from artists where profile_id = auth.uid()
    )
  );

create policy "Anyone can create enquiries"
  on enquiries for insert with check (true);

-- ============================================================
-- APPLICATIONS (join flow)
-- ============================================================
create table public.applications (
  id uuid default uuid_generate_v4() primary key,
  email text not null,
  full_name text not null,
  phone text,
  city text,
  state text,
  bio text,
  disciplines text[] not null default '{}',
  work_description text,
  price_range text,
  lead_time text,
  image_urls text[] default '{}',
  slug_preference text,
  instagram text,
  website text,
  why_makeshift text,
  status text not null default 'new' check (status in ('new', 'in_review', 'approved', 'rejected')),
  reviewer_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.applications enable row level security;

create policy "Anyone can submit applications"
  on applications for insert with check (true);

create policy "Admins can view all applications"
  on applications for select using (
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- CONTACT MESSAGES
-- ============================================================
create table public.contact_messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  category text not null default 'general',
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "Anyone can submit contact messages"
  on contact_messages for insert with check (true);

create policy "Admins can view contact messages"
  on contact_messages for select using (
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- SEED: Categories
-- ============================================================
insert into categories (slug, label, bg, sort_order) values
  ('fashion', 'Fashion', 'bg-sand', 1),
  ('music', 'Music', 'bg-navy', 2),
  ('visual-art', 'Visual Art', 'bg-rust', 3),
  ('ceramics', 'Ceramics', 'bg-terra', 4),
  ('tattoo', 'Tattoo', 'bg-char', 5),
  ('jewellery', 'Jewellery', 'bg-gold', 6),
  ('graphic', 'Graphic', 'bg-acid', 7),
  ('photography', 'Photography', 'bg-ink', 8);
