# ⚡ Quick Deploy to Vercel

**Deploy in 10 minutes!** Follow these steps:

## 🎯 Prerequisites

1. [Vercel Account](https://vercel.com/signup) (free)
2. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) (free)
3. GitHub account

---

## 📦 Step 1: MongoDB Atlas (2 min)

1. Create free cluster at [MongoDB Atlas](https://cloud.mongodb.com/)
2. **Database Access:** Add user with password
3. **Network Access:** Allow 0.0.0.0/0
4. **Connect:** Copy connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/oauth-db
   ```

---

## 🔑 Step 2: OAuth Credentials (5 min)

### Google OAuth:
1. [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → Enable Google+ API
3. Create OAuth Client ID
4. **Redirect URI:** `https://your-api.vercel.app/auth/google/callback`
5. Save Client ID & Secret

### Facebook OAuth:
1. [Facebook Developers](https://developers.facebook.com/)
2. Create app → Add Facebook Login
3. **Redirect URI:** `https://your-api.vercel.app/auth/facebook/callback`
4. Save App ID & Secret

---

## 🚀 Step 3: Deploy (3 min)

### Deploy Backend:

```bash
# Push to GitHub first
git add .
git commit -m "Ready for deployment"
git push
```

1. Go to [Vercel](https://vercel.com/new)
2. Import your repo
3. **Root Directory:** `server`
4. Deploy

**Add Environment Variables:**
```env
NODE_ENV=production
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=generate-random-64-char-string
JWT_REFRESH_SECRET=generate-random-64-char-string
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-secret
GOOGLE_REDIRECT_URI=https://your-api.vercel.app/auth/google/callback
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-secret
FACEBOOK_REDIRECT_URI=https://your-api.vercel.app/auth/facebook/callback
CORS_ORIGIN=https://your-app.vercel.app
MOCK_OAUTH=false
```

**Generate JWT Secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Redeploy after adding variables.

### Deploy Frontend:

1. Go to [Vercel](https://vercel.com/new)
2. Import same repo
3. **Root Directory:** `client`
4. **Framework:** Vite

**Add Environment Variable:**
```env
VITE_API_URL=https://your-api.vercel.app
```

Deploy!

---

## ✅ Step 4: Test (1 min)

1. Visit: `https://your-app.vercel.app`
2. Try Google/Facebook login
3. Done! 🎉

---

## 🆘 Issues?

**CORS Error?**
- Check `CORS_ORIGIN` matches frontend URL exactly
- Redeploy backend

**OAuth Fails?**
- Verify redirect URIs match exactly
- Check credentials are correct

**Full Guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🎊 Success!

Your app is live at:
- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-api.vercel.app/health`

**Enjoy!** 🚀

