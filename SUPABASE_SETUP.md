# Supabase Setup Instructions

## 1. Install Dependencies

Due to PowerShell execution policy restrictions, you'll need to install the Supabase client manually:

```bash
# Option 1: Enable script execution temporarily (Run PowerShell as Administrator)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then run:
npm install @supabase/supabase-js

# Option 2: Use CMD instead of PowerShell
# Open Command Prompt (cmd) and run:
npm install @supabase/supabase-js
```

# Supabase Setup Instructions

## ⚠️ IMPORTANT: Choose Your Path

- **Option A: Fresh Setup**: If you have a completely empty project with no tables, follow **Section 1**.
- **Option B: Update Existing Project**: If you already ran the previous setup and have tables (`profiles`, `messages`, etc.), skip to **Section 2**.

---

## Section 1: Fresh Setup (For New Projects Only)

Run these commands ONLY if you have not created any tables yet.

### 1. Enable RLS & Extensions
```sql
-- Create Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    profile_pic TEXT,
    bio TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    is_banned BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    preferences JSONB DEFAULT '{"musicAlerts": false, "communityMentions": false, "storeExclusives": false}'::jsonb
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Create Messages Table
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    channel TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    username TEXT NOT NULL,
    text TEXT NOT NULL,
    profile_pic TEXT,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Messages are viewable by everyone" ON messages FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert messages" ON messages FOR INSERT 
WITH CHECK (
    auth.uid() = user_id AND 
    (SELECT is_banned FROM profiles WHERE id = auth.uid()) = false
);
CREATE POLICY "Users can delete own messages" ON messages FOR DELETE 
USING (
    auth.uid() = user_id OR 
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE INDEX IF NOT EXISTS messages_channel_created_at_idx ON messages(channel, created_at DESC);

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    image_url TEXT,
    category TEXT,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);

-- Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    items JSONB NOT NULL,
    total NUMERIC(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 2. Setup Triggers & Functions (Fresh)
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

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## Section 2: Update Existing Project (Run This To Fix/Update)

If you already have tables, run these commands to apply the latest fixes (Admin logic, Deletion, Verification).

### 1. Fix Profile Deletion (Adding Cascade)
This allows `delete_user` to work without constraints errors.
```sql
-- Drop existing foreign key
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Re-add with CASCADE
ALTER TABLE profiles 
    ADD CONSTRAINT profiles_id_fkey 
    FOREIGN KEY (id) 
    REFERENCES auth.users(id) 
    ON DELETE CASCADE;
```

### 2. Install Helper Functions (Delete & Verify)
Run this block to install the secure admin tools:
```sql
-- Secure User Deletion
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

-- User Verification
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

### 3. Update Signup Logic (Admin)
Run this to ensure new signups use the correct admin logic:
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

---

## Section 3: Maintenance & Cleanups

### Reset Admin Roles
Run this if your admin account isn't showing up correctly:
```sql
-- 1. Remove admin status from everyone else
UPDATE profiles SET role = 'user' WHERE email != 'jeromemoses220@gmail.com';

-- 2. Force Jerome to be admin
UPDATE profiles SET role = 'admin', username = 'Jerome Moses', is_verified = true WHERE email = 'jeromemoses220@gmail.com';
```

### Sample Data (Optional)
```sql
INSERT INTO products (name, description, price, image_url, category, stock) VALUES
('Foundation T-Shirt', 'Premium black and gold Gyaviira Foundation t-shirt', 35.00, '/products/tshirt.png', 'apparel', 100),
('Rhythm Hoodie', 'Comfortable hoodie with embroidered logo', 65.00, '/products/hoodie.png', 'apparel', 50)
ON CONFLICT DO NOTHING;
```

