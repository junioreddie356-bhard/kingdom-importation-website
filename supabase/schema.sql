create extension if not exists "uuid-ossp";

create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null,
  description text not null,
  price_range text not null,
  photo_url text default '',
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists quote_requests (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  organisation text not null,
  email text not null,
  phone text not null,
  client_type text not null,
  product_needed text not null,
  quantity text default '',
  delivery_location text not null,
  additional_details text default '',
  status text default 'New',
  notes text default '',
  created_at timestamptz default now()
);

create table if not exists certifications (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  file_url text not null,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text not null,
  quote text not null,
  created_at timestamptz default now()
);

create table if not exists site_settings (
  id uuid primary key default uuid_generate_v4(),
  key text not null unique,
  value jsonb not null,
  created_at timestamptz default now()
);

create index if not exists idx_products_category on products(category);
create index if not exists idx_products_featured on products(featured);
create index if not exists idx_quote_requests_status on quote_requests(status);
