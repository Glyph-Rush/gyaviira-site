# SQL Updates for Existing Database

Run these commands in your Supabase SQL Editor to apply the latest features.

### 1. Fix Profile Deletion Constraints
This enables the "Delete User" feature to work correctly by allowing cascade deletion.

```sql
-- Drop existing foreign key connection
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Re-establish connection with CASCADE DELETE
ALTER TABLE profiles 
    ADD CONSTRAINT profiles_id_fkey 
    FOREIGN KEY (id) 
    REFERENCES auth.users(id) 
    ON DELETE CASCADE;
```

### 2. Install Admin Functions
Run this block to add the secure `delete_user` and `verify_user` functions.

```sql
-- Secure User Deletion Function
CREATE OR REPLACE FUNCTION delete_user(target_user_id UUID)
RETURNS void AS $$
BEGIN
    -- Check if the requester is an admin or the owner
    IF (SELECT role FROM profiles WHERE id = auth.uid()) != 'admin' AND auth.uid() != target_user_id THEN
        RAISE EXCEPTION 'Unauthorized: Only admins or the owner can delete this account.';
    END IF;

    -- Delete from auth.users (cascades to profiles)
    DELETE FROM auth.users WHERE id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- User Verification Function
CREATE OR REPLACE FUNCTION verify_user(target_user_id UUID)
RETURNS void AS $$
BEGIN
    IF (SELECT role FROM profiles WHERE id = auth.uid()) != 'admin' THEN
        RAISE EXCEPTION 'Unauthorized: Only admins can verify accounts.';
    END IF;

    UPDATE profiles SET is_verified = true WHERE id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3. Update Admin Logic
Run this to ensure `jeromemoses220@gmail.com` is definitively recognized as the admin.

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, email, username, role, is_verified)
    VALUES (
        new.id,
        new.email,
        CASE 
            WHEN new.email = 'jeromemoses220@gmail.com' THEN 'Jerome Moses'
            ELSE COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
        END,
        CASE 
            WHEN new.email = 'jeromemoses220@gmail.com' THEN 'admin'
            ELSE 'user'
        END,
        CASE 
            WHEN new.email = 'jeromemoses220@gmail.com' THEN true
            ELSE false
        END
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 4. Apply Admin Role (Cleanup)
Run this if your admin account already exists but needs its role fixed.

```sql
-- Downgrade everyone else
UPDATE profiles SET role = 'user' WHERE email != 'jeromemoses220@gmail.com';

-- Fix your admin account
UPDATE profiles 
SET role = 'admin', username = 'Jerome Moses', is_verified = true 
WHERE email = 'jeromemoses220@gmail.com';
```
