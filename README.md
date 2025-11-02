# 🔐 OAuth2 Social Login - MERN Stack

A complete, production-ready OAuth2 social authentication system built with MongoDB, Express.js, React.js, and Node.js. Features Google and Facebook login using Authorization Code Flow with PKCE, JWT-based sessions, and secure cookie handling.

## ✨ Features

- 🔑 **OAuth2 Authentication** - Google and Facebook login with PKCE
- 📧 **Email/Password Auth** - Traditional signup and login
- 🔒 **JWT Sessions** - Access tokens (15min) + Refresh tokens (7 days)
- 🍪 **Secure Cookies** - HttpOnly cookies prevent XSS attacks
- 🛡️ **CSRF Protection** - State parameter validation
- 🔐 **Password Hashing** - Bcrypt with salt rounds
- 📱 **Responsive UI** - Works on all devices
- 🚀 **Production Ready** - Deployed on Vercel with MongoDB Atlas

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- OAuth2 with PKCE

**Frontend:**
- React.js 18
- Vite
- React Router v6
- Axios
- Context API

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm run install-all
```

### 2. Create Environment Files

**`server/.env`:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/oauth-social-login
CLIENT_URL=http://localhost:5173

# Generate these: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your-generated-secret
JWT_REFRESH_SECRET=your-generated-secret

# Get from Google Cloud Console
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback

# Get from Facebook Developers
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
FACEBOOK_REDIRECT_URI=http://localhost:5000/auth/facebook/callback
```

**`client/.env`:**
```env
VITE_API_URL=http://localhost:5000
```

### 3. Start MongoDB

```bash
# macOS
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Run the Application

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## 🔑 OAuth Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 Client ID
5. Add redirect URI: `http://localhost:5000/auth/google/callback`
6. Copy Client ID and Secret to `server/.env`

### Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app (Consumer type)
3. Add Facebook Login product
4. Add redirect URI: `http://localhost:5000/auth/facebook/callback`
5. **Add Data Deletion URL (Required):** `http://localhost:5000/auth/facebook/data-deletion`
6. Copy App ID and Secret to `server/.env`

## 📁 Project Structure

```
O Auth/
├── server/                 # Backend
│   ├── index.js           # Express server
│   ├── routes/
│   │   └── authRoutes.js  # Auth endpoints
│   ├── models/
│   │   └── User.js        # User model
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification
│   ├── utils/
│   │   ├── jwt.js         # JWT utilities
│   │   └── oauth.js       # OAuth2 PKCE
│   ├── package.json
│   └── .env
│
├── client/                 # Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── .env
│
├── package.json
├── vercel.json            # Vercel config
└── README.md
```

## 🔌 API Endpoints

### Public Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Create account |
| POST | `/auth/login` | Login with email/password |
| GET | `/auth/google` | Initiate Google OAuth |
| GET | `/auth/google/callback` | Google callback |
| GET | `/auth/facebook` | Initiate Facebook OAuth |
| GET | `/auth/facebook/callback` | Facebook callback |

### Protected Routes (Requires JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/me` | Get current user |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Logout |

### Special Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/facebook/data-deletion` | Facebook data deletion callback |
| GET | `/auth/data-deletion-status` | Data deletion status page |

## 🚢 Deploy to Vercel

### Prerequisites

1. **MongoDB Atlas** (Free tier)
   - Create cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create database user
   - Allow access from anywhere (0.0.0.0/0)
   - Get connection string

2. **Generate Production Secrets**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Click Deploy

3. **Add Environment Variables** (in Vercel Dashboard)
   ```
   NODE_ENV=production
   MONGODB_URI=your-atlas-connection-string
   JWT_SECRET=your-generated-secret
   JWT_REFRESH_SECRET=your-generated-secret
   CLIENT_URL=https://your-project.vercel.app
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_REDIRECT_URI=https://your-project.vercel.app/auth/google/callback
   FACEBOOK_CLIENT_ID=your-facebook-app-id
   FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
   FACEBOOK_REDIRECT_URI=https://your-project.vercel.app/auth/facebook/callback
   VITE_API_URL=https://your-project.vercel.app
   ```

4. **Update OAuth Redirect URIs**
   - **Google Console:** Add `https://your-project.vercel.app/auth/google/callback`
   - **Facebook Console:** Add `https://your-project.vercel.app/auth/facebook/callback`
   - **Facebook Data Deletion:** Add `https://your-project.vercel.app/auth/facebook/data-deletion`

5. **Redeploy** in Vercel dashboard

## 🔒 Security Features

| Feature | Implementation |
|---------|---------------|
| **PKCE** | SHA-256 code challenge prevents authorization code interception |
| **JWT Tokens** | Short-lived access tokens with refresh token rotation |
| **HttpOnly Cookies** | Tokens stored in httpOnly cookies prevent XSS |
| **State Parameter** | Random state for CSRF protection in OAuth flows |
| **Password Hashing** | Bcrypt with 10 salt rounds |
| **Secure Cookies** | Secure flag enabled in production (HTTPS only) |
| **CORS** | Configured with credentials support |

## 🧪 Testing

### Test Without OAuth

1. Open http://localhost:5173
2. Click "Sign Up"
3. Create account with email/password
4. Login and view dashboard

### Test OAuth (After Setup)

1. Click "Login with Google"
2. Authorize the app
3. View dashboard with Google profile

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Verify MongoDB is running: `mongosh` or `mongo`
- Check connection string in `server/.env`
- For Atlas: Verify network access allows all IPs (0.0.0.0/0)

### OAuth Redirect URI Mismatch
- Redirect URIs must match exactly (no trailing slashes)
- Use HTTPS in production
- Check provider console and `.env` match

### CORS Errors
- Verify `CLIENT_URL` matches frontend URL
- Check `axios.defaults.withCredentials = true` is set
- Clear browser cookies

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Environment Variables Not Loading
- Restart the server after changing `.env`
- Verify file is named exactly `.env` (not `.env.txt`)
- Check for syntax errors (no spaces around `=`)

## 📊 Environment Variables Reference

### Backend (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development/production |
| MONGODB_URI | Database connection | mongodb://localhost:27017/oauth-social-login |
| CLIENT_URL | Frontend URL | http://localhost:5173 |
| JWT_SECRET | Access token secret | (64-byte hex string) |
| JWT_REFRESH_SECRET | Refresh token secret | (64-byte hex string) |
| GOOGLE_CLIENT_ID | Google OAuth client ID | From Google Console |
| GOOGLE_CLIENT_SECRET | Google OAuth secret | From Google Console |
| GOOGLE_REDIRECT_URI | Google callback URL | http://localhost:5000/auth/google/callback |
| FACEBOOK_CLIENT_ID | Facebook app ID | From Facebook Developers |
| FACEBOOK_CLIENT_SECRET | Facebook app secret | From Facebook Developers |
| FACEBOOK_REDIRECT_URI | Facebook callback URL | http://localhost:5000/auth/facebook/callback |

### Frontend (`client/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000 |

## 🎨 UI Pages

### Login Page (`/login`)
- Email/password login form
- Google OAuth button
- Facebook OAuth button
- Link to signup page

### Signup Page (`/signup`)
- Registration form
- Social signup options
- Password validation

### Dashboard (`/dashboard` - Protected)
- User profile with avatar
- Account information
- Provider badge
- Login statistics
- Security info

## 📝 Available Scripts

```bash
# Install all dependencies (root, server, client)
npm run install-all

# Run both servers concurrently
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Generating JWT Secrets

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate JWT_REFRESH_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 💰 Cost Breakdown (Production)

- **Vercel Hosting:** Free (Hobby plan)
- **MongoDB Atlas:** Free (M0 tier, 512MB)
- **Google OAuth:** Free
- **Facebook OAuth:** Free

**Total: $0/month** 🎉

## 📚 Learning Resources

This project demonstrates:
- RESTful API design
- OAuth2 Authorization Code Flow with PKCE
- JWT authentication patterns
- React Context API for state management
- Protected routes implementation
- Secure cookie handling
- MongoDB schema design
- Modern React patterns (hooks, functional components)
- Responsive CSS design

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - Free to use for personal and commercial projects.

## 🆘 Support

If you encounter issues:
1. Check this README for solutions
2. Verify all environment variables are set
3. Check MongoDB is running
4. Clear browser cookies and cache
5. Check server logs for errors

## 🎓 Key Implementation Details

### OAuth2 PKCE Flow
```
1. Generate code_verifier (random string)
2. Generate code_challenge (SHA-256 hash of verifier)
3. Redirect to provider with challenge
4. Provider redirects back with code
5. Exchange code + verifier for tokens
6. Fetch user profile
7. Create/update user in database
8. Generate JWT tokens
9. Set httpOnly cookies
10. Redirect to dashboard
```

### JWT Token Strategy
- **Access Token:** 15 minutes (short-lived for security)
- **Refresh Token:** 7 days (stored in database, rotated on use)
- **Stored in:** httpOnly cookies (prevents XSS)
- **Transmitted via:** Cookie headers (automatic)

### Password Security
- Hashed with bcrypt (10 salt rounds)
- Never stored in plain text
- Never returned in API responses

## 🏆 Production Checklist

Before deploying to production:

- [ ] Generate strong JWT secrets (use crypto.randomBytes)
- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas (not local MongoDB)
- [ ] Update OAuth redirect URIs to production URLs
- [ ] Add Facebook data deletion URL
- [ ] Enable secure cookie flags (automatic in production)
- [ ] Verify CORS settings
- [ ] Test all authentication flows
- [ ] Set up error logging
- [ ] Enable MongoDB Atlas backups
- [ ] Monitor Vercel logs

---

**Built with ❤️ using MERN Stack**

🌟 **Star this repo if you found it helpful!**
