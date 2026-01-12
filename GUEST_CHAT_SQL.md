# Guest Chat SQL Setup

To enable Guest Chat (where users can chat without an account using a nickname), you MUST run these commands in your Supabase SQL Editor.

## ⚠️ Critical: Allow Anonymous Messages

By default, the system requires every message to be linked to a registered user. These commands remove that restriction.

```sql
-- 1. Allow messages to have no user_id (NULL allows guests)
ALTER TABLE messages ALTER COLUMN user_id DROP NOT NULL;

-- 2. Remove the strict link to the profiles table
-- This allows a message to exist even if the user_id doesn't match a registered user.
ALTER TABLE messages DROP CONSTRAINT IF EXISTS messages_user_id_fkey;

-- 3. (Optional) Cleanup old test messages if they cause issues
-- TRUNCATE TABLE messages;
```

## How to Run
1. Go to your **Supabase Dashboard**.
2. Click on the **SQL Editor** (icon on the left).
3. Paste the code above.
4. Click **Run**.
