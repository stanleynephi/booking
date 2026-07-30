
-- database recreate file for backup



create table shop_owners (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  phone text,
  created_at timestamp default now()
);

create table shops (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references shop_owners(id) on delete cascade,
  slug text unique not null,
  name text not null,
  category text not null,
  description text,
  logo_url text,
  location text,
  phone text,
  created_at timestamp default now()
);

create table services (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid references shops(id) on delete cascade,
  name text not null,
  duration_minutes int not null,
  price numeric not null,
  created_at timestamp default now()
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid references shops(id) on delete cascade,
  service_id uuid references services(id),
  customer_name text not null,
  customer_phone text not null,
  booking_date date not null,
  booking_time time not null,
  status text default 'pending',
  created_at timestamp default now()
);