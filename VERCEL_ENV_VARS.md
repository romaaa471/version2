# Vercel Environment Variables - Copy & Paste Ready

Copy these exact values into your Vercel project settings:

## Environment Variables for Vercel

Go to: **Your Project → Settings → Environment Variables**

Add each variable one by one:

### 1. Clerk Publishable Key
```
Variable Name: VITE_CLERK_PUBLISHABLE_KEY
Value: pk_test_b_0cy5kZXYk
Environment: Production, Preview, Development (select all)
```

### 2. Clerk Secret Key
```
Variable Name: CLERK_SECRET_KEY
Value: sk_test_T_z6oAxXDbA
Environment: Production, Preview, Development (select all)
```

### 3. MongoDB Connection String
```
Variable Name: MONGO_URI
Value: mongodb+srv://ramaelberry_db_user:mFYxFfqEV6d572ZN@version1.9bnnvce.mongodb.net/?appName=version1
Environment: Production, Preview, Development (select all)
```

**MongoDB Connection Format:**
```
mongodb+srv://ramaelberry_db_user:<db_password>@version1.9bnnvce.mongodb.net/
```
Replace `<db_password>` with your actual password: `mFYxFfqEV6d572ZN`

### 4. API URL (Update after first deployment)
```
Variable Name: VITE_API_URL
Value: https://your-app.vercel.app/api
Environment: Production, Preview, Development (select all)
```
**Note**: Replace `your-app.vercel.app` with your actual Vercel URL after first deploy

### 5. Client Origin (Update after first deployment)
```
Variable Name: CLIENT_ORIGIN
Value: https://your-app.vercel.app
Environment: Production, Preview, Development (select all)
```
**Note**: Replace `your-app.vercel.app` with your actual Vercel URL after first deploy

---

## Quick Setup Steps

1. **First Deploy**: Deploy without `VITE_API_URL` and `CLIENT_ORIGIN` (or use placeholder)
2. **Get Your URL**: After deploy, copy your Vercel URL (e.g., `my-app-123.vercel.app`)
3. **Update Variables**: Add/update `VITE_API_URL` and `CLIENT_ORIGIN` with your actual URL
4. **Redeploy**: Trigger a new deployment

## MongoDB Atlas Configuration

Make sure your MongoDB Atlas allows connections from Vercel:

1. Go to MongoDB Atlas Dashboard
2. Navigate to **Network Access**
3. Click **Add IP Address**
4. Add `0.0.0.0/0` (allows all IPs) OR add Vercel's IP ranges
5. Click **Confirm**

## Security Reminder

⚠️ **Never commit these values to Git!**
- The `.env` file should be in `.gitignore`
- These are sensitive credentials
- Only add them in Vercel's secure environment variables section

