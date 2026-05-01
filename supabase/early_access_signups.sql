create table if not exists public.early_access_signups (
  id bigint generated always as identity primary key,
  email text not null,
  platform text not null check (platform in ('ios', 'android')),
  locale text,
  source text default 'website',
  created_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists early_access_signups_email_platform_idx
  on public.early_access_signups (email, platform);

alter table public.early_access_signups enable row level security;

drop policy if exists "Allow public early access inserts" on public.early_access_signups;

create policy "Allow public early access inserts"
  on public.early_access_signups
  for insert
  to anon
  with check (true);
