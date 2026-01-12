# Guest Chat SQL Setup

To enable Guest Chat (where users can chat without an account using a nickname), you MUST run these commands in your Supabase SQL Editor.

## ⚠️ Step 1: Allow Anonymous Columns

Run these to make the database accept messages without a registered account link.

```sql
-- 1. Allow messages to have no user_id (NULL allows guests)
ALTER TABLE messages ALTER COLUMN user_id DROP NOT NULL;

-- 2. Remove the strict link to the profiles table
ALTER TABLE messages DROP CONSTRAINT IF EXISTS messages_user_id_fkey;
```

## 🔒 Step 2: Configure Permissions (RLS)

By default, Supabase blocks unauthorized access. Run these to allow anyone to see and send messages.

```sql
-- 1. Enable Row Level Security (if not already enabled)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 2. Allow anyone to VIEW messages
CREATE POLICY "Allow public select" ON messages 
FOR SELECT USING (true);

-- 3. Allow anyone to SEND messages
CREATE POLICY "Allow public insert" ON messages 
FOR INSERT WITH CHECK (true);
```

## ⚡ Step 3: Enable Live Streaming (Realtime)

This ensures messages pop up instantly without refreshing.

```sql
-- Add the messages table to the realtime publication
alter publication supabase_realtime add table messages;
```

## How to Apply
1. Go to your **Supabase Dashboard**.
2. Click on the **SQL Editor** (icon on the left).
3. Paste **ALL** the code from the boxes above.
4. Click **Run**.
5. Refresh your website! 🚀
