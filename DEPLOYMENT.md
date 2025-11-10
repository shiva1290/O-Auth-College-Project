# 🚀 Vercel Deployment Guide

Complete guide to deploy your OAuth Social Login application to Vercel.

## 📋 Prerequisites

Before deploying, you need:

1. ✅ **Vercel Account** - [Sign up free](https://vercel.com/signup)
2. ✅ **MongoDB Atlas Account** - [Sign up free](https://www.mongodb.com/cloud/atlas/register)
3. ✅ **Google OAuth Credentials** - [Google Cloud Console](https://console.cloud.google.com/)
4. ✅ **Facebook OAuth Credentials** - [Facebook Developers](https://developers.facebook.com/)
5. ✅ **GitHub Account** - To connect with Vercel

---

## 🎯 Deployment Strategy

We'll deploy as **TWO separate Vercel projects**:

1. **Backend API** → `your-api.vercel.app`
2. **Frontend App** → `your-app.vercel.app`

This separation provides:
- ✅ Better scalability
- ✅ Independent deployments
- ✅ Clearer CORS configuration
- ✅ Easier debugging

---

## 📦 Step 1: Setup MongoDB Atlas

### 1.1 Create Database

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new project: **"OAuth Social Login"**
3. Build a cluster (Free tier is fine)
4. Wait for cluster creation (~5 minutes)

### 1.2 Create Database User

1. Security → Database Access → Add New Database User
2. Choose **Password** authentication
3. Username: `oauthuser`
4. Password: Generate strong password (save it!)
5. Database User Privileges: **Read and write to any database**
6. Add User

### 1.3 Whitelist IP Addresses

1. Security → Network Access → Add IP Address
2. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
3. Confirm

### 1.4 Get Connection String

1. Database → Connect → Connect your application
2. Driver: **Node.js** / Version: **5.5 or later**
3. Copy connection string:
   ```
   mongodb+srv://oauthuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name: `oauth-db`
   ```
   mongodb+srv://oauthuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/oauth-db?retryWrites=true&w=majority
   ```

---

## 🔑 Step 2: Setup OAuth Credentials

### 2.1 Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create New Project: **"OAuth Social Login"**
3. Enable **Google+ API**

**Create Credentials:**
1. APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
2. Configure Consent Screen (External, fill required fields)
3. Application Type: **Web application**
4. Name: **OAuth Social Login**
5. **Authorized redirect URIs:**
   ```
   https://your-api.vercel.app/auth/google/callback
   http://localhost:5000/auth/google/callback
   ```
6. Create → **Save Client ID and Client Secret**

### 2.2 Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. My Apps → Create App → **Consumer** → Next
3. App Name: **OAuth Social Login**
4. Create App

**Configure Facebook Login:**
1. Add Product → **Facebook Login** → Web
2. Settings → Basic:
   - Copy **App ID** and **App Secret**
3. Facebook Login → Settings:
   - **Valid OAuth Redirect URIs:**
     ```
     https://your-api.vercel.app/auth/facebook/callback
     http://localhost:5000/auth/facebook/callback
     ```
4. Save Changes

---

## 🚢 Step 3: Deploy Backend to Vercel

### 3.1 Push Code to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/oauth-backend.git
git branch -M main
git push -u origin main
```

### 3.2 Deploy Backend on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. **Import Project** → Import Git Repository
3. Select your GitHub repository
4. **Root Directory:** `server`
5. **Framework Preset:** Other
6. Click **Deploy**

### 3.3 Configure Backend Environment Variables

After initial deployment:

1. Project Settings → Environment Variables
2. Add the following variables:

```env
# Required Variables
NODE_ENV=production
PORT=5000

# MongoDB (from Step 1)
MONGODB_URI=mongodb+srv://oauthuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/oauth-db?retryWrites=true&w=majority

# JWT Secrets (generate random strings)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_REFRESH_SECRET=your-super-secret-refresh-key-minimum-32-characters-long
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Google OAuth (from Step 2.1)
GOOGLE_CLIENT_ID=123456789.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxx
GOOGLE_REDIRECT_URI=https://your-api.vercel.app/auth/google/callback
GOOGLE_SCOPES=https://www.googleapis.com/auth/userinfo.profile,https://www.googleapis.com/auth/userinfo.email

# Facebook OAuth (from Step 2.2)
FACEBOOK_APP_ID=123456789012345
FACEBOOK_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FACEBOOK_REDIRECT_URI=https://your-api.vercel.app/auth/facebook/callback
FACEBOOK_SCOPES=email,public_profile

# CORS & Cookies
CORS_ORIGIN=https://your-app.vercel.app
COOKIE_DOMAIN=your-api.vercel.app

# Features
MOCK_OAUTH=false
```

**Important:** Replace:
- `YOUR_PASSWORD` with MongoDB password
- `your-api.vercel.app` with your actual backend URL
- `your-app.vercel.app` with your actual frontend URL (will get in Step 4)
- OAuth credentials with your actual values

### 3.4 Generate Secure JWT Secrets

Use this command to generate secure secrets:

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate JWT_REFRESH_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy and paste these into Vercel environment variables.

### 3.5 Redeploy Backend

After adding environment variables:
1. Deployments → Click the latest deployment → Redeploy
2. Wait for deployment to complete
3. Note your backend URL: `https://your-api.vercel.app`

### 3.6 Test Backend

Visit: `https://your-api.vercel.app/health`

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2024-11-10T...",
  "environment": "production",
  "database": "connected",
  "features": {
    "mockOAuth": false,
    "csrf": true,
    "rateLimit": true
  }
}
```

✅ **Backend deployed successfully!**

---

## 🎨 Step 4: Deploy Frontend to Vercel

### 4.1 Update API URL in Frontend

Create environment file for frontend:

**client/.env.production:**
```env
VITE_API_URL=https://your-api.vercel.app
```

Update if using different variable names in code.

### 4.2 Update API Base URL

Check `client/src/context/AuthContext.jsx` or wherever axios is configured:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

### 4.3 Deploy Frontend on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. **Import Project** → Import Git Repository (same repo or different)
3. **Root Directory:** `client`
4. **Framework Preset:** Vite
5. **Build Command:** `npm run build`
6. **Output Directory:** `dist`
7. **Environment Variables:**
   ```
   VITE_API_URL=https://your-api.vercel.app
   ```
8. Click **Deploy**

### 4.4 Get Frontend URL

After deployment completes:
- Note your frontend URL: `https://your-app.vercel.app`

### 4.5 Update Backend CORS

Go back to backend Vercel project:

1. Settings → Environment Variables
2. Update `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=https://your-app.vercel.app
   ```
3. Update `CLIENT_URL` (if exists):
   ```
   CLIENT_URL=https://your-app.vercel.app
   ```
4. Redeploy backend

### 4.6 Update OAuth Redirect URIs

**Update Google OAuth:**
1. [Google Cloud Console](https://console.cloud.google.com/)
2. APIs & Services → Credentials → Your OAuth Client
3. **Authorized redirect URIs:** Add:
   ```
   https://your-api.vercel.app/auth/google/callback
   ```
4. Save

**Update Facebook OAuth:**
1. [Facebook Developers](https://developers.facebook.com/)
2. Your App → Facebook Login → Settings
3. **Valid OAuth Redirect URIs:** Add:
   ```
   https://your-api.vercel.app/auth/facebook/callback
   ```
4. Save Changes

✅ **Frontend deployed successfully!**

---

## 🧪 Step 5: Test Production Deployment

### 5.1 Test Authentication

1. Visit: `https://your-app.vercel.app`
2. Try **Email Registration:**
   - Sign up with email/password
   - Should create account and login
3. Try **Google Login:**
   - Click "Continue with Google"
   - Should redirect to Google
   - Grant permissions
   - Should redirect back and login
4. Try **Facebook Login:**
   - Click "Continue with Facebook"
   - Should redirect to Facebook
   - Grant permissions
   - Should redirect back and login

### 5.2 Test Features

- ✅ Dashboard loads with user info
- ✅ Profile picture displays
- ✅ Logout works
- ✅ Protected routes work
- ✅ Settings page loads
- ✅ Account linking works

### 5.3 Check Logs

**Backend Logs:**
1. Vercel Dashboard → Your API Project
2. Deployments → Latest → View Function Logs
3. Check for errors

**Frontend Logs:**
1. Browser Console (F12)
2. Check for errors

---

## 🔧 Step 6: Post-Deployment Configuration

### 6.1 Setup Custom Domains (Optional)

**Backend:**
1. Settings → Domains → Add Domain
2. Enter: `api.yourdomain.com`
3. Follow DNS configuration instructions

**Frontend:**
1. Settings → Domains → Add Domain
2. Enter: `app.yourdomain.com` or `yourdomain.com`
3. Follow DNS configuration instructions

**Update environment variables with new domains!**

### 6.2 Enable Production Features

**Facebook App:**
1. Make app public (currently in Development Mode)
2. Settings → Basic → App Mode → Switch to Live

**Google OAuth:**
1. Publishing Status should be "In Production"

### 6.3 Seed Admin Account

SSH into your deployment or run locally connected to production DB:

```bash
# Set production MongoDB URI
export MONGODB_URI="your-production-mongodb-uri"

# Run seed script
npm run seed
```

This creates:
- Admin: admin@example.com / Admin123!@#
- Moderator: moderator@example.com / Mod123!@#
- User: user@example.com / User123!@#

**Change passwords immediately after first login!**

---

## 📊 Step 7: Monitoring & Maintenance

### 7.1 Setup Monitoring

**Vercel Analytics:**
1. Project Settings → Analytics → Enable

**MongoDB Monitoring:**
1. Atlas Dashboard → Metrics
2. Monitor connections, operations, storage

### 7.2 Check Health Endpoint

Add to monitoring service:
```
https://your-api.vercel.app/health
```

### 7.3 Regular Updates

```bash
# Keep dependencies updated
npm outdated
npm update

# Security audit
npm audit
npm audit fix
```

### 7.4 Backup Database

1. Atlas Dashboard → Clusters
2. Click "..." → Backup
3. Schedule automatic backups

---

## 🚨 Troubleshooting

### Issue: "Network Error" when logging in

**Solution:**
1. Check CORS_ORIGIN in backend matches frontend URL exactly
2. Check API_URL in frontend matches backend URL exactly
3. Redeploy both after changes

### Issue: OAuth redirect fails

**Solution:**
1. Verify redirect URIs in Google/Facebook match exactly
2. Must use HTTPS in production
3. Check backend logs for errors

### Issue: "Database connection failed"

**Solution:**
1. Check MongoDB URI is correct
2. Verify IP whitelist includes 0.0.0.0/0
3. Check database user has correct permissions
4. Test connection string locally

### Issue: "JWT malformed" errors

**Solution:**
1. Clear browser cookies
2. Verify JWT_SECRET is set in backend
3. Check JWT_SECRET is at least 32 characters
4. Redeploy backend after setting secrets

### Issue: "CORS policy" errors

**Solution:**
1. Check CORS_ORIGIN environment variable
2. Must match frontend URL exactly (no trailing slash)
3. Check COOKIE_DOMAIN is correct
4. Redeploy after changes

### Issue: Profile pictures not loading

**Solution:**
1. Check avatar proxy route is deployed
2. Verify external image URLs are accessible
3. Check browser console for errors
4. Clear browser cache

---

## 📚 Environment Variables Checklist

### Backend (Required)

- [ ] `NODE_ENV=production`
- [ ] `PORT=5000`
- [ ] `MONGODB_URI=mongodb+srv://...`
- [ ] `JWT_SECRET=...` (64+ chars)
- [ ] `JWT_REFRESH_SECRET=...` (64+ chars)
- [ ] `GOOGLE_CLIENT_ID=...`
- [ ] `GOOGLE_CLIENT_SECRET=...`
- [ ] `GOOGLE_REDIRECT_URI=https://your-api.vercel.app/auth/google/callback`
- [ ] `FACEBOOK_APP_ID=...`
- [ ] `FACEBOOK_APP_SECRET=...`
- [ ] `FACEBOOK_REDIRECT_URI=https://your-api.vercel.app/auth/facebook/callback`
- [ ] `CORS_ORIGIN=https://your-app.vercel.app`
- [ ] `MOCK_OAUTH=false`

### Frontend (Required)

- [ ] `VITE_API_URL=https://your-api.vercel.app`

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas database created and configured
- [ ] Google OAuth credentials created
- [ ] Facebook OAuth credentials created
- [ ] Backend deployed to Vercel
- [ ] Backend environment variables set
- [ ] Backend health check passes
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variables set
- [ ] CORS configured correctly
- [ ] OAuth redirect URIs updated
- [ ] Test email registration
- [ ] Test Google login
- [ ] Test Facebook login
- [ ] Test all features (dashboard, settings, etc.)
- [ ] Admin account seeded
- [ ] Custom domains configured (optional)
- [ ] Monitoring enabled
- [ ] Documentation updated with production URLs

---

## 🎉 Success!

Your OAuth Social Login application is now live on Vercel!

**Your URLs:**
- 🌐 Frontend: `https://your-app.vercel.app`
- 🔌 Backend: `https://your-api.vercel.app`
- 📊 Health: `https://your-api.vercel.app/health`

**Share your app:**
```
🎊 Check out my OAuth Social Login app:
https://your-app.vercel.app

Features:
✅ Google & Facebook login
✅ JWT authentication
✅ Role-based access
✅ Profile management
✅ Account linking
```

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Docs:** https://docs.mongodb.com/
- **Google OAuth Docs:** https://developers.google.com/identity/protocols/oauth2
- **Facebook OAuth Docs:** https://developers.facebook.com/docs/facebook-login/

**Common Issues:** See Troubleshooting section above

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically deploys! 🚀
```

**That's it! Happy deploying! 🎊**

