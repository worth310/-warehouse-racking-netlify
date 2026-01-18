# Deployment Guide - Warehouse Racking System

## Option 1: Deploy to Netlify (Recommended - FREE)

### Step 1: Install Git
1. Download Git from: https://git-scm.com/download/win
2. Run the installer and follow the steps
3. Restart your terminal

### Step 2: Create GitHub Account
1. Go to https://github.com/signup
2. Create a free account
3. Verify your email

### Step 3: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `warehouse-racking-netlify`
3. Description: `Professional Warehouse Inventory Management System`
4. Choose "Public" (required for free Netlify)
5. Click "Create repository"

### Step 4: Push Code to GitHub
In your terminal (after installing Git):

```bash
cd C:\Users\worth\warehouse-racking-netlify

git init
git add .
git commit -m "Initial commit - Warehouse Racking System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/warehouse-racking-netlify.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 5: Connect to Netlify
1. Go to https://app.netlify.com
2. Click "Sign up"
3. Choose "Sign up with GitHub"
4. Authorize Netlify to access GitHub
5. Click "New site from Git"
6. Select your `warehouse-racking-netlify` repository
7. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
8. Click "Deploy site"

**Your app will be live at a URL like: `warehouse-racking.netlify.app`**

### Step 6: Custom Domain (Optional)
1. In Netlify dashboard, go to "Domain settings"
2. Add your custom domain
3. Update DNS records (Netlify provides instructions)

---

## Option 2: Deploy to Vercel (FREE Alternative)

1. Go to https://vercel.com/signup
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

**Your app will be at: `warehouse-racking.vercel.app`**

---

## Option 3: Deploy to Your Own Server (Advanced)

### Build the app first:
```bash
npm run build
```

This creates a `dist` folder with production-ready files.

### Deploy to:
- **AWS** - S3 + CloudFront
- **Google Cloud** - Cloud Storage + CDN
- **DigitalOcean** - App Platform or Droplet
- **Heroku** - Free tier ended, but still available
- **Render.com** - Free tier available
- **Fly.io** - Global deployment, free tier

---

## Environment Variables for Production

In your hosting platform's environment settings, add:

```
REACT_APP_FIREBASE_API_KEY=your_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain_here
REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket_here
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_id_here
REACT_APP_FIREBASE_APP_ID=your_app_id_here
```

Get these from your Firebase project settings.

---

## Post-Deployment

After deploying:
1. ✅ Test all features on mobile and desktop
2. ✅ Verify items save and persist
3. ✅ Test search and filtering
4. ✅ Check back office functionality
5. ✅ Share your public URL with team members

---

## Quick Start - Netlify (Easiest)

**Total time: 10 minutes**

1. Install Git (5 min)
2. Create GitHub account (2 min)
3. Push code to GitHub (2 min)
4. Connect to Netlify (1 min)
5. Done! Your app is live ✅

Your app will automatically deploy every time you push changes to GitHub!

---

## Need Help?

- Netlify Docs: https://docs.netlify.com/
- Vercel Docs: https://vercel.com/docs
- Firebase Setup: https://firebase.google.com/docs
