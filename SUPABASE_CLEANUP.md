# Database Cleanup & Reset Scripts

Use these SQL commands to remove the "Account System" components while maintaining the "Messaging" system.

> [!WARNING]
> **DO NOT DROP THE `profiles` TABLE.**
> The Chat system relies on `profiles` to identify message senders. If you drop `profiles`, you will break the chat.

## 1. Remove Account Hub Data
These commands delete the tables and columns associated with the removed Account Hub and Store History.

```sql
-- 1. Remove the Order History table (Store accounts)
DROP TABLE IF EXISTS orders;

-- 2. Remove the Preferences column (User settings)
ALTER TABLE profiles DROP COLUMN IF EXISTS preferences;
```

## 2. Verify Cleanup
Run this query to check your `profiles` table. It should only contain essential data (id, username, etc).

```sql
SELECT * FROM profiles LIMIT 5;
```

## 3. Reset All Data (Optional)
**Use with caution.** If you want to delete ALL messages and users to start fresh, run these:

```sql
-- DELETE ALL MESSAGES (Chat Reset)
TRUNCATE TABLE messages;

-- OPTIONAL: DELETE ALL PROFILES (Resets Users - Requires Re-Signup)
-- Note: This requires deleting users from auth.users as well, which can only be done via the Supabase Dashboard > Authentication > Users.
DELETE FROM profiles;
```

## 4. Enable Guest Chat (Critical for Nicknames)
To allow users to chat with just a temporary nickname (without an account), run these commands:

```sql
-- 1. Allow messages to have no user_id
ALTER TABLE messages ALTER COLUMN user_id DROP NOT NULL;

-- 2. Remove the constraint linking messages to profiles
ALTER TABLE messages DROP CONSTRAINT IF EXISTS messages_user_id_fkey;
```
