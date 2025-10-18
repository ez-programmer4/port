# 🔐 How to Change Admin Credentials

Guide to update your admin email and password anytime.

---

## 🎯 Method 1: Using Prisma Studio (Easiest)

### Step 1: Connect to Production Database

```bash
# Set production DATABASE_URL
$env:DATABASE_URL=(Get-Content .env.production | Select-String 'DATABASE_URL' | ForEach-Object { $_ -replace 'DATABASE_URL=\"(.*)\"', '$1' })

# Open Prisma Studio
npx prisma studio
```

### Step 2: Update Admin User

1. Prisma Studio opens in your browser (http://localhost:5555)
2. Click on **"User"** table
3. You'll see your admin user
4. Click on the user row to edit

### Step 3: Change Email

- Simply update the **email** field
- Click **Save** (green checkmark)

### Step 4: Change Password

**Important**: You can't just type a plain password - it must be hashed!

**Option A - Generate Hash Online:**

1. Visit: https://bcrypt-generator.com/
2. Enter your new password
3. Rounds: 10
4. Click "Hash"
5. Copy the bcrypt hash (starts with `$2a$10$...`)
6. Paste it in the **password** field in Prisma Studio
7. Click **Save**

**Option B - Use Node.js to Generate Hash:**

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YOUR_NEW_PASSWORD', 10, (err, hash) => { console.log(hash); });"
```

Copy the output and paste it in Prisma Studio.

---

## 🎯 Method 2: Re-Run Seed Script

### Step 1: Update Environment Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Your project → **Settings** → **Environment Variables**
3. Update:
   - `ADMIN_EMAIL` - New email
   - `ADMIN_PASSWORD` - New password
4. Click **Save**

### Step 2: Re-Seed Database

```bash
# Pull new environment variables
vercel env pull .env.production

# Re-run seed (will update existing admin)
$env:ADMIN_EMAIL="new-email@example.com"
$env:ADMIN_PASSWORD="new-password"
$env:DATABASE_URL=(Get-Content .env.production | Select-String 'DATABASE_URL' | ForEach-Object { $_ -replace 'DATABASE_URL=\"(.*)\"', '$1' })
npm run db:seed
```

The seed script uses `upsert`, so it will update the existing admin user.

---

## 🎯 Method 3: SQL Query (Advanced)

### Connect to Railway Database

1. Go to https://railway.app/dashboard
2. Click your MySQL service
3. Go to **"Query"** tab

### Update Email

```sql
UPDATE users
SET email = 'new-email@example.com'
WHERE role = 'admin';
```

### Update Password (with bcrypt hash)

First, generate the hash using bcrypt (see Method 1, Step 4).

Then run:

```sql
UPDATE users
SET password = '$2a$10$YOUR_GENERATED_HASH_HERE'
WHERE role = 'admin';
```

---

## 🎯 Method 4: Create Admin Update API (One-Time Use)

Create a temporary API endpoint to update admin:

### Create file: `src/app/api/update-admin/route.ts`

```typescript
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email: process.env.ADMIN_EMAIL! },
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ success: true });
}
```

### Use It Once

```bash
# Commit and push
git add .
git commit -m "Add admin update endpoint"
git push origin main

# Wait for deployment, then:
curl -X POST https://ezedin.me/api/update-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"new-email@example.com","password":"new-password"}'
```

### Delete It Immediately

```bash
# Remove the file
rm src/app/api/update-admin/route.ts

# Commit and push
git add .
git commit -m "Remove admin update endpoint"
git push origin main
```

---

## ✅ Recommended Method

**Use Method 1 (Prisma Studio)** - It's the easiest and safest!

1. Open Prisma Studio
2. Edit the user directly
3. For password, generate bcrypt hash
4. Done!

---

## 🔒 Security Tips

### For Passwords:

- ✅ Use strong passwords (12+ characters)
- ✅ Mix uppercase, lowercase, numbers, symbols
- ✅ Never share your password
- ✅ Change it if you suspect it's compromised

### For Email:

- ✅ Use an email you have access to
- ✅ Don't use temporary emails
- ✅ Keep it professional

---

## 📞 Quick Reference

### Open Prisma Studio

```bash
$env:DATABASE_URL=(Get-Content .env.production | Select-String 'DATABASE_URL' | ForEach-Object { $_ -replace 'DATABASE_URL=\"(.*)\"', '$1' })
npx prisma studio
```

### Generate Bcrypt Hash

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YOUR_PASSWORD', 10, (err, hash) => { console.log(hash); });"
```

Or visit: https://bcrypt-generator.com/

---

## 💡 Pro Tip

**Keep your credentials in a password manager** like:

- 1Password
- Bitwarden
- LastPass

This way you'll never forget them! 🔐
