# Deployment Guide: Vercel + Clerk Auth

This guide will help you deploy your food delivery app to Vercel with Clerk authentication.

## Prerequisites

1. A [Vercel account](https://vercel.com)
2. A [Clerk account](https://clerk.com)
3. A MongoDB database (MongoDB Atlas recommended)

## Step 1: Set up Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Copy your **Publishable Key** and **Secret Key**
4. Configure authentication methods (Email, Google, etc.) in Clerk dashboard

## Step 2: Set up MongoDB

1. Create a MongoDB Atlas account or use your existing MongoDB instance
2. Get your MongoDB connection string
3. Make sure your database is accessible from Vercel (whitelist IPs if needed)

## Step 3: Install Dependencies

```bash
cd Noureldeen_database
npm install
```

## Step 4: Configure Environment Variables

Create a `.env` file in the `Noureldeen_database` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
MONGO_URI=mongodb+srv://...
VITE_API_URL=http://localhost:3000/api
CLIENT_ORIGIN=http://localhost:5173
```

## Step 5: Deploy to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
cd Noureldeen_database
vercel
```

4. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add all variables from your `.env` file
   - **Important**: Update `VITE_API_URL` to your Vercel deployment URL (e.g., `https://your-app.vercel.app/api`)
   - **Important**: Update `CLIENT_ORIGIN` to your Vercel deployment URL (e.g., `https://your-app.vercel.app`)

5. Redeploy after setting environment variables:
```bash
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `Noureldeen_database`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variables (same as above)
7. Deploy

## Step 6: Update Clerk Settings

1. Go to Clerk Dashboard → Your App → Settings
2. Add your Vercel deployment URL to **Allowed Origins**
3. Update **Redirect URLs** if needed

## Step 7: Update API Calls

After deployment, make sure your frontend uses the correct API URL. The `VITE_API_URL` environment variable should point to your Vercel deployment.

## Troubleshooting

### CORS Issues
- Make sure `CLIENT_ORIGIN` in Vercel matches your deployment URL
- Check that Clerk has your domain in allowed origins

### MongoDB Connection Issues
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for Vercel)
- Ensure database user has proper permissions

### Authentication Issues
- Verify Clerk keys are correct
- Check Clerk dashboard for any errors
- Ensure Clerk domain is configured correctly

### Build Issues
- Make sure all dependencies are in `package.json`
- Check build logs in Vercel dashboard
- Verify Node.js version compatibility

## Local Development

To run locally:

```bash
# Frontend
npm run dev

# Backend (if testing server separately)
cd server
npm run dev
```

## Notes

- The backend is now serverless functions in the `/api` directory
- Clerk handles all authentication - no need for custom JWT tokens
- MongoDB connection is handled per-request in serverless functions
- Make sure to set all environment variables in Vercel dashboard

