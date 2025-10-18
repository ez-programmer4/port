# 🚀 Deploy Your Full-Stack Portfolio to ezedin.me

**Complete guide to deploy your portfolio with FULL backend functionality on Vercel.**

---

## ✅ What You're Getting

Your portfolio will have **EVERYTHING**:

- ✅ **Frontend** - Your beautiful portfolio website
- ✅ **Backend API** - All your API routes work
- ✅ **Database** - Full MySQL database (free)
- ✅ **Authentication** - Admin login & sessions
- ✅ **Image Uploads** - Cloudinary integration
- ✅ **Custom Domain** - ezedin.me (your domain!)
- ✅ **SSL/HTTPS** - Automatic & free
- ✅ **Auto-Deploy** - Push code = instant deploy

**Cost**: $0/month (100% free!)

---

## 📋 What You Need

Before starting, prepare these:

### 1. GitHub Account

- Your code will be on GitHub

### 2. Cloudinary Account

- For image uploads
- Sign up: https://cloudinary.com (free)
- Get your credentials from dashboard

### 3. Environment Variables Ready

Have these values ready:

| Variable                            | Where to Get It                                    |
| ----------------------------------- | -------------------------------------------------- |
| `NEXTAUTH_SECRET`                   | Generate at: https://generate-secret.vercel.app/32 |
| `ADMIN_EMAIL`                       | Your email                                         |
| `ADMIN_PASSWORD`                    | Choose a strong password                           |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary dashboard                               |
| `CLOUDINARY_API_KEY`                | Cloudinary dashboard                               |
| `CLOUDINARY_API_SECRET`             | Cloudinary dashboard                               |
| `DATABASE_URL`                      | We'll get this in Step 1                           |

---

## ⏱️ Timeline

| Step      | What              | Time            |
| --------- | ----------------- | --------------- |
| 1         | Create database   | 5 min           |
| 2         | Push to GitHub    | 2 min           |
| 3         | Deploy to Vercel  | 5 min           |
| 4         | Connect domain    | 3 min           |
| 5         | Setup database    | 5 min           |
| **Total** | **Live website!** | **~20 minutes** |

---

## 🗄️ STEP 1: Create Your Database (5 min)

Your app needs a MySQL database. We'll use **PlanetScale** (free & excellent).

### 1.1 Sign Up for PlanetScale

1. Go to https://planetscale.com
2. Click **"Sign up"**
3. Choose **"Continue with GitHub"**
4. Authorize PlanetScale

### 1.2 Create Database

1. Click **"Create a database"**
2. **Database name**: `portfolio`
3. **Region**: Choose closest to you (e.g., AWS us-east-1)
4. Click **"Create database"**

Wait ~30 seconds for it to initialize.

### 1.3 Get Connection String

1. Click **"Connect"**
2. **Connect with**: Select **"Prisma"** from dropdown
3. You'll see a connection string like:

```
mysql://xxxxx:pscale_pw_xxxxx@aws.connect.psdb.cloud/portfolio?sslaccept=strict
```

4. **Copy this entire string** - you'll need it for Vercel!

**✅ Done!** You have your database ready.

---

## 📦 STEP 2: Push Code to GitHub (2 min)

### 2.1 Initialize Git (if not done)

```bash
git init
git add .
git commit -m "Ready for deployment"
```

### 2.2 Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name**: `portfolio` (or any name you like)
3. **Public** or **Private** (your choice)
4. **Don't** initialize with README (you already have files)
5. Click **"Create repository"**

### 2.3 Push Your Code

GitHub will show you commands. Run these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

**✅ Done!** Your code is on GitHub.

---

## 🚀 STEP 3: Deploy to Vercel (5 min)

### 3.1 Sign Up for Vercel

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your repos

### 3.2 Import Your Project

1. You'll see your dashboard
2. Click **"Add New..."** → **"Project"**
3. Find your `portfolio` repository
4. Click **"Import"**

### 3.3 Configure Project Settings

Vercel auto-detects Next.js. You'll see:

**Framework Preset**: Next.js ✅ (auto-detected)

**Build Command**: Leave as default or use:

```
prisma generate && next build
```

**Output Directory**: `.next` ✅ (auto-detected)

**Root Directory**: `./` ✅ (default)

### 3.4 Add Environment Variables

This is **IMPORTANT** - your app won't work without these!

Click **"Environment Variables"** section, then add these **ONE BY ONE**:

#### Variable 1: DATABASE_URL

- **Key**: `DATABASE_URL`
- **Value**: Paste the connection string from PlanetScale (Step 1.3)
- **Environment**: Select all (Production, Preview, Development)

#### Variable 2: NEXTAUTH_URL

- **Key**: `NEXTAUTH_URL`
- **Value**: `https://ezedin.me`
- **Environment**: Select all

#### Variable 3: NEXTAUTH_SECRET

- **Key**: `NEXTAUTH_SECRET`
- **Value**: Visit https://generate-secret.vercel.app/32 and paste the generated secret
- **Environment**: Select all

#### Variable 4: ADMIN_EMAIL

- **Key**: `ADMIN_EMAIL`
- **Value**: Your email address
- **Environment**: Select all

#### Variable 5: ADMIN_PASSWORD

- **Key**: `ADMIN_PASSWORD`
- **Value**: Your strong password (12+ characters)
- **Environment**: Select all

#### Variable 6: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

- **Key**: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- **Value**: Your Cloudinary cloud name (from Cloudinary dashboard)
- **Environment**: Select all

#### Variable 7: CLOUDINARY_API_KEY

- **Key**: `CLOUDINARY_API_KEY`
- **Value**: Your Cloudinary API key
- **Environment**: Select all

#### Variable 8: CLOUDINARY_API_SECRET

- **Key**: `CLOUDINARY_API_SECRET`
- **Value**: Your Cloudinary API secret
- **Environment**: Select all

### 3.5 Deploy!

1. After adding all environment variables, click **"Deploy"**
2. Wait 2-3 minutes while Vercel builds your app
3. You'll see a success screen with a URL like:
   ```
   https://portfolio-abc123.vercel.app
   ```

**✅ Test it!** Click the URL - your site should load!

---

## 🌐 STEP 4: Connect Your Domain (3 min)

Now let's connect **ezedin.me** to your Vercel deployment.

### 4.1 Add Domain in Vercel

1. In your Vercel project dashboard
2. Go to **Settings** → **Domains**
3. In the input field, type: `ezedin.me`
4. Click **"Add"**

Vercel will show you DNS records to configure.

### 4.2 Configure DNS in Namecheap

1. Go to https://namecheap.com
2. Dashboard → **Domain List**
3. Find **ezedin.me** → Click **"Manage"**
4. Click **"Advanced DNS"** tab

### 4.3 Add DNS Records

**Remove any existing A or CNAME records** for @ and www, then add:

#### A Record for Root Domain:

- **Type**: `A Record`
- **Host**: `@`
- **Value**: `76.76.21.21`
- **TTL**: Automatic

#### CNAME Record for www:

- **Type**: `CNAME Record`
- **Host**: `www`
- **Value**: `cname.vercel-dns.com.`
- **TTL**: Automatic

Click **"Save All Changes"**

### 4.4 Wait for DNS Propagation

- **Usually**: 5-10 minutes
- **Can take**: Up to 48 hours (rare)
- **Check status**: Go back to Vercel → Domains section

When it's ready, you'll see a green checkmark next to `ezedin.me` in Vercel.

**✅ Done!** Your domain is connected!

---

## 🗄️ STEP 5: Setup Production Database (5 min)

Now we need to push your database schema to the production database.

### 5.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 5.2 Login & Link Project

```bash
# Login to Vercel
vercel login

# Link your project (choose the one you just deployed)
vercel link
```

Follow the prompts:

- **Set up project?** Y
- **Link to existing project?** Y
- **Project name?** Select your portfolio project

### 5.3 Pull Environment Variables

```bash
vercel env pull .env.production
```

This downloads your production environment variables locally.

### 5.4 Push Database Schema

```bash
# Generate Prisma client
npx prisma generate

# Push schema to production database
npx prisma db push
```

You should see: ✅ Database schema updated successfully!

### 5.5 Seed Admin User

```bash
npm run db:seed
```

This creates your admin user in the database.

**✅ Done!** Your database is ready!

---

## ✅ STEP 6: Test Your Live Site

Visit these URLs and test:

### Homepage

```
https://ezedin.me
```

**Test:**

- [ ] Homepage loads
- [ ] All sections visible (Hero, About, Projects, etc.)
- [ ] Navigation works
- [ ] Contact form displays

### Admin Panel

```
https://ezedin.me/admin/login
```

**Login with:**

- Email: The `ADMIN_EMAIL` you set
- Password: The `ADMIN_PASSWORD` you set

**Test:**

- [ ] Can login successfully
- [ ] Dashboard loads
- [ ] Can create a new project
- [ ] Can upload images
- [ ] All CRUD operations work

### Mobile Test

- [ ] Open site on your phone
- [ ] Test navigation
- [ ] Test contact form

**✅ Everything working?** Congratulations! 🎉

---

## 🔄 How to Update Your Site (Future)

This is the best part - **automatic deployments**!

### Make Changes

```bash
# Edit your code locally
# For example: Update src/components/Hero.tsx

# Commit changes
git add .
git commit -m "Updated hero section"

# Push to GitHub
git push origin main
```

**That's it!** Vercel automatically:

1. Detects your push
2. Builds your app
3. Deploys the new version
4. Updates https://ezedin.me

**No manual deployment needed!** 🎉

---

## 🎯 Understanding Your Architecture

### What You Have:

```
┌─────────────────────────────────────────┐
│     https://ezedin.me (Your Domain)     │
│              Vercel Hosting              │
├─────────────────────────────────────────┤
│                                          │
│  ┌──────────────┐    ┌──────────────┐  │
│  │   Frontend   │    │   Backend    │  │
│  │  Next.js UI  │◄──►│  API Routes  │  │
│  └──────────────┘    └──────────────┘  │
│         │                    │          │
│         │                    │          │
│         ▼                    ▼          │
│  ┌──────────────┐    ┌──────────────┐  │
│  │ Cloudinary   │    │ PlanetScale  │  │
│  │   (Images)   │    │   (MySQL)    │  │
│  └──────────────┘    └──────────────┘  │
│                                          │
└─────────────────────────────────────────┘
```

### You Have FULL Backend:

- ✅ **MySQL Database** - PlanetScale (5GB free)
- ✅ **API Routes** - All your `/api/*` endpoints work
- ✅ **Authentication** - NextAuth.js sessions
- ✅ **File Uploads** - Cloudinary integration
- ✅ **Admin Dashboard** - Full CRUD operations
- ✅ **Contact Form** - Saves to database

**It's a complete full-stack application!**

---

## 🛠️ Troubleshooting

### Build Fails on Vercel

**Check**: Build logs in Vercel dashboard

**Common fixes:**

```bash
# Make sure package.json has correct build script
"build": "prisma generate && next build"
```

### Can't Login to Admin

**Check:**

1. Is `NEXTAUTH_URL` exactly `https://ezedin.me` (no trailing slash)?
2. Is `NEXTAUTH_SECRET` set and 32+ characters?
3. Did you run `npm run db:seed`?

**Fix:**

```bash
# Re-seed the database
vercel env pull .env.production
npm run db:seed
```

### Images Not Uploading

**Check:**

1. Is `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` set?
2. Note: Must start with `NEXT_PUBLIC_`
3. Are `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` set?

**Fix**: Verify all 3 Cloudinary variables in Vercel dashboard

### Database Connection Error

**Check:**

1. Is `DATABASE_URL` correct in Vercel?
2. Copy it exactly from PlanetScale

**Fix**: Update `DATABASE_URL` in Vercel → Settings → Environment Variables, then redeploy

### Domain Not Working

**Check:**

1. Did you wait 10+ minutes for DNS?
2. Are DNS records correct in Namecheap?

**Test DNS**: Visit https://dnschecker.org and search for `ezedin.me`

---

## 📊 Your Free Resources

| Service         | Free Tier       | What You Get                 |
| --------------- | --------------- | ---------------------------- |
| **Vercel**      | Unlimited       | Hosting, SSL, CDN, Analytics |
| **PlanetScale** | 5GB storage     | MySQL database, Backups      |
| **Cloudinary**  | 25GB storage    | Image hosting, CDN           |
| **GitHub**      | Unlimited       | Version control              |
| **Domain**      | Free for 1 year | ezedin.me (Student Pack)     |
| **Total**       | **$0/month**    | Everything! 🎉               |

---

## 🎓 Optional: Enable Vercel Pro (Free with Student Pack)

You have GitHub Student Developer Pack, so:

1. Go to https://vercel.com/account
2. Look for "Upgrade" or "Pro"
3. Apply GitHub Student Developer Pack benefit

**Benefits:**

- Priority support
- More build minutes
- Advanced analytics
- Better performance

---

## 📞 Quick Commands Reference

### Local Development

```bash
npm run dev              # Start dev server
npm run build            # Test production build
```

### Database

```bash
npm run db:push          # Push schema changes
npm run db:seed          # Seed data
npm run db:studio        # Open Prisma Studio
```

### Deployment

```bash
git add .
git commit -m "Update message"
git push origin main     # Auto-deploys to Vercel!
```

### Vercel CLI

```bash
vercel login             # Login
vercel link              # Link project
vercel env pull          # Pull environment variables
vercel logs              # View deployment logs
```

---

## 🎉 Congratulations!

Your full-stack portfolio is live at:

- 🌐 **https://ezedin.me**
- 🔐 **https://ezedin.me/admin/login**

You have:

- ✅ Complete frontend
- ✅ Full backend with database
- ✅ Working admin dashboard
- ✅ Custom domain with SSL
- ✅ Automatic deployments
- ✅ $0/month hosting cost

**Now go apply for jobs and show off your amazing work! 💪**

---

## 📱 Next Steps

### Week 1:

- [ ] Add your real projects to the admin
- [ ] Update the about section
- [ ] Add your work experience
- [ ] Test on all devices
- [ ] Share on LinkedIn

### Month 1:

- [ ] Enable Vercel Analytics
- [ ] Submit to Google Search Console
- [ ] Add more projects
- [ ] Get testimonials
- [ ] Apply for jobs!

---

**Questions?** Check the troubleshooting section above or review the build logs in Vercel dashboard.

**Good luck! 🚀**
