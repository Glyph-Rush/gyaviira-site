# SQL Update: Dynamic Frequencies & Governance

Run these commands in the Supabase SQL Editor to enable dynamic channel management and enhanced governance.

## 1. Create Channels Table
This table stores the dynamically added chat frequencies.

```sql
create table channels (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  is_restricted boolean default false, -- If true, only admins can post
  created_by uuid references profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default channels
insert into channels (slug, name, is_restricted) values 
('announcements', 'Announcements', true),
('general-vibe', 'General Vibe', false),
('production-tech', 'Production & Tech', false),
('live-transmissions', 'Live Transmissions', false),
('prayer-wall', 'Prayer Wall', false),
('member-lore', 'Member Lore', false);

-- Enable RLS
alter table channels enable row level security;

-- Policy: Everyone can view channels
create policy "Channels are viewable by everyone."
  on channels for select
  using ( true );

-- Policy: Only Admins can manage channels
create policy "Admins can manage channels."
  on channels for all
  using ( 
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );
```

## 2. Update Messages Table (Optional Metadata)
Enhance the messages table with potential thread or reaction support (Future-proofing).

```sql
-- Add reaction support to messages
alter table messages add column if not exists reactions jsonb default '{}';
```

## 3. Storage Policy Update
Ensuring public access to any new system assets.

```sql
-- Ensure public read for assets
create policy "System assets are public."
  on storage.objects for select
  using ( bucket_id = 'public' );
```
