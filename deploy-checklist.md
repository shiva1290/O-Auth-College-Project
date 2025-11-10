# ✅ Deployment Checklist

Use this checklist to ensure everything is ready for deployment.

## 📋 Pre-Deployment

### MongoDB Atlas
- [ ] Free cluster created
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] Database name set to `oauth-db`

### Google OAuth
- [ ] Project created in Google Cloud Console
- [ ] OAuth Client ID created
- [ ] Client ID saved
- [ ] Client Secret saved
- [ ] Redirect URI added: `https://your-api.vercel.app/auth/google/callback`
- [ ] Redirect URI added: `http://localhost:5000/auth/google/callback` (for dev)

### Facebook OAuth
- [ ] App created in Facebook Developers
- [ ] Facebook Login product added
- [ ] App ID saved
- [ ] App Secret saved
- [ ] Redirect URI added: `https://your-api.vercel.app/auth/facebook/callback`
- [ ] Redirect URI added: `http://localhost:5000/auth/facebook/callback` (for dev)

### GitHub
- [ ] Code pushed to GitHub repository
- [ ] Repository is accessible
- [ ] `.env` files are in `.gitignore`

## 🚀 Backend Deployment

### Vercel Setup
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] Root directory set to `server`
- [ ] Framework preset set to "Other"
- [ ] Initial deployment successful

### Environment Variables (Backend)
- [ ] `NODE_ENV=production`
- [ ] `PORT=5000`
- [ ] `MONGODB_URI` (from MongoDB Atlas)
- [ ] `JWT_SECRET` (64+ characters)
- [ ] `JWT_REFRESH_SECRET` (64+ characters)
- [ ] `JWT_ACCESS_EXPIRES_IN=15m`
- [ ] `JWT_REFRESH_EXPIRES_IN=7d`
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `GOOGLE_REDIRECT_URI`
- [ ] `GOOGLE_SCOPES`
- [ ] `FACEBOOK_APP_ID`
- [ ] `FACEBOOK_APP_SECRET`
- [ ] `FACEBOOK_REDIRECT_URI`
- [ ] `FACEBOOK_SCOPES`
- [ ] `CORS_ORIGIN` (will update after frontend deployment)
- [ ] `CLIENT_URL` (will update after frontend deployment)
- [ ] `COOKIE_DOMAIN`
- [ ] `MOCK_OAUTH=false`

### Backend Testing
- [ ] Backend URL noted: `https://______.vercel.app`
- [ ] Health endpoint works: `/health`
- [ ] Returns "healthy" status
- [ ] Database shows "connected"
- [ ] No console errors in Vercel logs

## 🎨 Frontend Deployment

### Vercel Setup
- [ ] Repository imported to Vercel (same or different repo)
- [ ] Root directory set to `client`
- [ ] Framework preset set to "Vite"
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Initial deployment successful

### Environment Variables (Frontend)
- [ ] `VITE_API_URL` (backend URL from above)

### Frontend Testing
- [ ] Frontend URL noted: `https://______.vercel.app`
- [ ] Homepage loads correctly
- [ ] Login page displays
- [ ] No console errors in browser

## 🔄 Post-Deployment Updates

### Update Backend with Frontend URL
- [ ] Go to backend Vercel project settings
- [ ] Update `CORS_ORIGIN` to frontend URL
- [ ] Update `CLIENT_URL` to frontend URL
- [ ] Redeploy backend
- [ ] Test CORS works (no CORS errors)

### Update OAuth Redirect URIs
- [ ] Update Google OAuth redirect URIs with production URL
- [ ] Update Facebook OAuth redirect URIs with production URL
- [ ] Remove or keep localhost URLs for development

## 🧪 Testing

### Authentication Tests
- [ ] Email registration works
- [ ] Email login works
- [ ] Google OAuth login works
- [ ] Facebook OAuth login works
- [ ] Logout works
- [ ] Tokens are set correctly

### Feature Tests
- [ ] Dashboard loads with user data
- [ ] Profile picture displays
- [ ] User name displays correctly
- [ ] Settings page accessible
- [ ] Profile editing works
- [ ] Account linking works
- [ ] Admin page accessible (for admin users)

### Security Tests
- [ ] Protected routes redirect to login
- [ ] JWT tokens expire correctly
- [ ] Refresh tokens work
- [ ] CORS properly configured
- [ ] No sensitive data in client logs
- [ ] No .env files exposed

## 🔐 Production Hardening

### Security
- [ ] All secrets are strong and random
- [ ] JWT secrets are 64+ characters
- [ ] MongoDB password is strong
- [ ] No secrets in code
- [ ] `.env` files are gitignored
- [ ] Rate limiting enabled
- [ ] CSRF protection enabled

### OAuth Apps
- [ ] Facebook app set to "Live" mode (not Development)
- [ ] Google OAuth consent screen published
- [ ] Privacy policy URL added (if required)
- [ ] Terms of service URL added (if required)

### Database
- [ ] MongoDB backups enabled
- [ ] Connection limit appropriate
- [ ] Indexes created for performance
- [ ] Admin user seeded

### Monitoring
- [ ] Vercel analytics enabled
- [ ] Error tracking setup (optional: Sentry)
- [ ] Health endpoint monitoring (optional: UptimeRobot)
- [ ] Database monitoring enabled in Atlas

## 📱 Optional Enhancements

### Custom Domain
- [ ] Domain purchased
- [ ] DNS configured for frontend
- [ ] DNS configured for backend API
- [ ] SSL certificate auto-provisioned
- [ ] Environment variables updated with custom domains

### Performance
- [ ] Frontend assets optimized
- [ ] Images compressed
- [ ] Code splitting implemented
- [ ] Caching headers configured

### SEO
- [ ] Meta tags added
- [ ] Open Graph tags added
- [ ] Favicon added
- [ ] robots.txt configured

## 🎉 Launch

- [ ] All tests passing
- [ ] No errors in logs
- [ ] Performance acceptable
- [ ] Team notified
- [ ] Documentation updated with production URLs
- [ ] Admin credentials saved securely

## 📊 Post-Launch

### Week 1
- [ ] Monitor error logs daily
- [ ] Check user registration metrics
- [ ] Verify OAuth success rates
- [ ] Review performance metrics
- [ ] Address any critical issues

### Week 2-4
- [ ] Gather user feedback
- [ ] Fix non-critical bugs
- [ ] Optimize slow queries
- [ ] Review security logs
- [ ] Plan next features

## 🆘 Emergency Contacts

- **Vercel Support:** support@vercel.com
- **MongoDB Atlas:** https://support.mongodb.com
- **Google OAuth:** https://support.google.com/cloud
- **Facebook:** https://developers.facebook.com/support

---

## 🎊 Deployment Complete!

Congratulations! Your OAuth Social Login app is now live in production! 🚀

**Share your success:**
- Frontend: `https://_______.vercel.app`
- Backend: `https://_______.vercel.app`
- Health: `https://_______.vercel.app/health`

**Next steps:**
1. Monitor logs for first 24 hours
2. Test all features with real users
3. Gather feedback
4. Iterate and improve

**Celebrate!** 🎉🎊🥳

