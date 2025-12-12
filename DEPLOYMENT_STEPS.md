# Quick Deployment Steps

## 1. Install Dependencies

```bash
cd Noureldeen_database
npm install
```

## 2. Set Up Clerk

1. Go to https://clerk.com and create an account
2. Create a new application
3. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
4. Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)

## 3. Set Up MongoDB

✅ **Your MongoDB is already configured!**

**Connection String Format:**
```
mongodb+srv://ramaelberry_db_user:<db_password>@version1.9bnnvce.mongodb.net/
```

**Your Actual Connection String:**
```
mongodb+srv://ramaelberry_db_user:mFYxFfqEV6d572ZN@version1.9bnnvce.mongodb.net/?appName=version1
```

**Important:** Make sure to whitelist IP `0.0.0.0/0` in MongoDB Atlas Network Access for Vercel connections.

## 4. Deploy to Vercel

### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd Noureldeen_database
vercel
```

### Option B: Vercel Dashboard

1. Push code to GitHub
2. Go to https://vercel.com/dashboard
3. Click "New Project"
4. Import your repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `Noureldeen_database`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

## 5. Set Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables and add:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_b_0cy5kZXYk
CLERK_SECRET_KEY=sk_test_T_z6oAxXDbA
MONGO_URI=mongodb+srv://ramaelberry_db_user:mFYxFfqEV6d572ZN@version1.9bnnvce.mongodb.net/?appName=version1
VITE_API_URL=https://your-app.vercel.app/api
CLIENT_ORIGIN=https://your-app.vercel.app
```

**Your Configuration:**
- ✅ Publishable Key: `pk_test_b_0cy5kZXYk`
- ✅ Secret Key: `sk_test_T_z6oAxXDbA`
- ✅ MongoDB URI: `mongodb+srv://ramaelberry_db_user:...@version1.9bnnvce.mongodb.net/`

**Important**: 
- Replace `your-app.vercel.app` with your actual Vercel deployment URL (you'll get this after first deploy)
- Make sure MongoDB Atlas allows connections from Vercel (whitelist IP `0.0.0.0/0` in MongoDB Atlas Network Access)

## 6. Configure Clerk

1. Go to Clerk Dashboard → Your App → Settings
2. Add your Vercel URL to **Allowed Origins**
3. Update **Redirect URLs** if needed

## 7. Redeploy

After setting environment variables, redeploy your app:

```bash
vercel --prod
```

Or trigger a new deployment from the Vercel dashboard.

## Testing

1. Visit your deployed URL
2. Click "Sign In" to test Clerk authentication
3. Try placing an order to test the API

## Troubleshooting

- **CORS errors**: Check `CLIENT_ORIGIN` matches your Vercel URL
- **Auth errors**: Verify Clerk keys are correct
- **MongoDB errors**: Check connection string and IP whitelist
- **Build errors**: Check Node.js version (should be 18+)

