# Clerk Setup with Your Keys

## Your Clerk Configuration

Based on your Clerk dashboard, here are your API keys:

### Frontend (Public - Safe to expose)
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_b_0cy5kZXYk
```

### Backend (Secret - Keep private!)
```
CLERK_SECRET_KEY=sk_test_T_z6oAxXDbA
```

## Quick Setup

### 1. For Local Development

Create a `.env` file in the `Noureldeen_database` folder:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_b_0cy5kZXYk
CLERK_SECRET_KEY=sk_test_T_z6oAxXDbA
MONGO_URI=mongodb+srv://ramaelberry_db_user:mFYxFfqEV6d572ZN@version1.9bnnvce.mongodb.net/?appName=version1
VITE_API_URL=http://localhost:3000/api
CLIENT_ORIGIN=http://localhost:5173
```

### 2. For Vercel Deployment

Add these environment variables in Vercel Dashboard:

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add each variable:

| Variable Name | Value |
|--------------|-------|
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_test_b_0cy5kZXYk` |
| `CLERK_SECRET_KEY` | `sk_test_T_z6oAxXDbA` |
| `MONGO_URI` | `mongodb+srv://ramaelberry_db_user:mFYxFfqEV6d572ZN@version1.9bnnvce.mongodb.net/?appName=version1` |
| `VITE_API_URL` | `https://your-app.vercel.app/api` |
| `CLIENT_ORIGIN` | `https://your-app.vercel.app` |

### 3. Configure Clerk Dashboard

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to: **Configure** → **Allowed Origins**
3. Add your Vercel URL: `https://your-app.vercel.app`
4. Also add for local dev: `http://localhost:5173`

### 4. Test Authentication

After deployment:
1. Visit your Vercel URL
2. Click "Sign In"
3. You should see Clerk's authentication UI
4. Create an account or sign in

## Security Notes

⚠️ **Important:**
- Never commit `.env` files to Git
- The Secret Key (`sk_test_...`) should NEVER be exposed in frontend code
- Only use the Publishable Key (`pk_test_...`) in your React app
- The Secret Key is only used in serverless functions (`/api/*`)

## Your Clerk URLs (from dashboard)

- **Frontend API URL**: `https://needed-fly-34.clerk.accounts.dev`
- **Backend API URL**: `https://api.clerk.com`
- **JWKS URL**: Available in your Clerk dashboard

These are automatically configured - you don't need to set them manually.

