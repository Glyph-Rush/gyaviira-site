# Supabase Update V2: Marketing & Private Frequencies

This update enables the **Marketing Role**, assigns new personnel permissions, and secures **Private Chat** channels.

## 1. Governance: Enhanced Role Policy
Run this SQL to include the `marketing` role in channel management permissions.

```sql
-- Reset old policies
DROP POLICY IF EXISTS "admin_and_founder_management" ON public.channels;

-- Create unified policy for Admin, Founder, and Marketing
CREATE POLICY "staff_management_policy" 
ON public.channels FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'founder', 'marketing')
  )
);
```

## 2. Personnel: Role Assignments
Run this to assign the new Hierarchy roles to specific accounts.

```sql
-- 1. Josiah Nyemera -> Head of Marketing
UPDATE public.profiles 
SET role = 'marketing' 
WHERE email = 'nyemerajosiah12@gmail.com';

-- 2. Chris Nshuti -> Founder (Head of Records)
UPDATE public.profiles 
SET role = 'founder' 
WHERE email = 'chris16nshuti@gmail.com';

-- 3. Generic Accounts
UPDATE public.profiles SET role = 'marketing' WHERE email = 'marketing@gyaviira.com';
UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@gyaviira.com';
```

## 3. Private Encrypted Frequencies (Direct Messages)
Run this to secure the new `dm-*` channels. This ensures a user can only read/write to a private channel if their username is part of the channel ID (e.g., `dm-chris-jerome`).

```sql
-- Enable Row Level Security on Messages for Private Chats
DROP POLICY IF EXISTS "private_dm_access" ON public.messages;

CREATE POLICY "private_dm_access"
ON public.messages FOR ALL
USING (
  -- Allow if public channel OR if it's a DM and the user is a participant
  channel NOT LIKE 'dm-%' 
  OR (
    channel LIKE 'dm-%' 
    AND channel LIKE '%' || (regexp_replace((SELECT username FROM public.profiles WHERE id = auth.uid())::text, '[^a-z0-9]', '-', 'g')) || '%'
  )
);
```

---
**Verification**:
1. Josiah should now see the **HEAD OF MARKETING** badge.
2. Clicking "Transmission Request" should open a secure DM.
3. Only the two participants in a DM (and Admins) can theoretically view those messages (via RLS).
