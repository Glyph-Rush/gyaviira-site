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

## 2. Database Schema Setup

Run the following SQL commands in your Supabase SQL Editor (https://gxrfxbjqlbaexbxmfvdi.supabase.co):

### Create Profiles Table
```sql
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
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

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
```

### Create Messages Table
```sql
CREATE TABLE messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    channel TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    username TEXT NOT NULL,
    text TEXT NOT NULL,
    profile_pic TEXT,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Messages are viewable by everyone" ON messages FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert messages" ON messages FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own messages" ON messages FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own messages" ON messages FOR DELETE USING (auth.uid() = user_id);

-- Index for channel queries
CREATE INDEX messages_channel_created_at_idx ON messages(channel, created_at DESC);
```

### Create Products Table
```sql
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    image_url TEXT,
    category TEXT,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
```

### Create Orders Table
```sql
CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    items JSONB NOT NULL,
    total NUMERIC(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### Create Profile on Signup Trigger
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, email, username, role, is_verified)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
        CASE 
            WHEN new.email IN ('jeromemoses220@gmail.com', 'assist@gyaviira.com') THEN 'admin'
            ELSE 'user'
        END,
        CASE 
            WHEN new.email IN ('jeromemoses220@gmail.com', 'assist@gyaviira.com') THEN true
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

## 3. Insert Sample Products

```sql
INSERT INTO products (name, description, price, image_url, category, stock) VALUES
('Foundation T-Shirt', 'Premium black and gold Gyaviira Foundation t-shirt', 35.00, '/products/tshirt.png', 'apparel', 100),
('Rhythm Hoodie', 'Comfortable hoodie with embroidered logo', 65.00, '/products/hoodie.png', 'apparel', 50),
('Vinyl Collection', 'Limited edition foundation anthology vinyl', 45.00, '/products/vinyl.png', 'music', 25),
('Logo Cap', 'Adjustable snapback with foundation emblem', 25.00, '/products/cap.png', 'accessories', 75);
```

## 4. Enable Realtime

In your Supabase dashboard:
1. Go to Database → Replication
2. Enable realtime for the `messages` table

## 5. Admin Accounts

Pre-configured admin emails:
- `jeromemoses220@gmail.com` (Jerome Moses)
- `assist@gyaviira.com` (Assist) - Password: `Luganda_pop_345`

These will automatically receive admin role upon signup.
