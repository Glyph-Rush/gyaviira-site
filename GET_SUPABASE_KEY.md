# How to Get Your Correct Supabase API Key

## Important: The key format you provided is incorrect!

The format `sb_publishable_hDQg-oVQ6Wu_jiHapTiUSA_T8hLLr1i` is NOT a valid Supabase anon key.

### Steps to Get the Correct Key:

1. **Go to your Supabase Dashboard**:
   - Visit: https://supabase.com/dashboard
   - Select your project: `gxrfxbjqlbaexbxmfvdi`

2. **Navigate to Settings → API**:
   - Click on **Settings** (gear icon in sidebar)
   - Click on **API**

3. **Copy the ANON/PUBLIC Key**:
   - Look for the section "Project API keys"
   - Find "anon" or "public" key
   - It should look like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4cmZ4YmpxbGJhZXhieG1mdmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMDQwNzIsImV4cCI6MjA1MTU4MDA3Mn0.SIGNATURE_HERE`
   - It's a **long JWT token** that starts with `eyJ...`

4. **Verify Your Project URL**:
   - Also on the API page, confirm your Project URL
   - Should be: `https://gxrfxbjqlbaexbxmfvdi.supabase.co`

### Once You Have the Correct Key:

Provide it in this format:
```
URL: https://gxrfxbjqlbaexbxmfvdi.supabase.co
ANON_KEY: eyJhbGciOiJI... (the complete JWT token)
```

**Note**: The key you provided (`sb_publishable_...`) appears to be from a different service or an incomplete key. Supabase anon keys are always JWT tokens.
