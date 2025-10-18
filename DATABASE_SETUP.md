# 🗄️ Database Setup Guide

This guide will help you set up MySQL database with Prisma for your portfolio.

## Prerequisites

- MySQL installed locally or access to a MySQL server
- Node.js and npm installed

## Step 1: Install MySQL

### Windows

1. Download MySQL from https://dev.mysql.com/downloads/installer/
2. Run the installer and follow the setup wizard
3. Remember your root password!

### macOS

```bash
brew install mysql
brew services start mysql
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

## Step 2: Create Database

Open MySQL command line or use MySQL Workbench:

```sql
CREATE DATABASE portfolio_db;
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
```

## Step 3: Configure Environment Variables

1. Copy the example file:

   ```bash
   cp env.example .env
   ```

2. Edit `.env` file with your database credentials:
   ```env
   DATABASE_URL="mysql://portfolio_user:your_password@localhost:3306/portfolio_db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-a-random-secret-key-here"
   ADMIN_EMAIL="admin@example.com"
   ADMIN_PASSWORD="your-secure-password"
   ```

## Step 4: Generate Prisma Client

```bash
npm run db:generate
```

## Step 5: Push Database Schema

This will create all tables:

```bash
npm run db:push
```

## Step 6: Seed Initial Data

This will create admin user and sample data:

```bash
npm run db:seed
```

## Step 7: Verify Setup

Open Prisma Studio to view your data:

```bash
npm run db:studio
```

This will open a browser at http://localhost:5555 where you can see all your tables and data.

## Database Schema

### Tables Created:

- ✅ **users** - Admin authentication
- ✅ **projects** - Portfolio projects
- ✅ **experiences** - Work history
- ✅ **testimonials** - Client reviews
- ✅ **skills** - Technical skills
- ✅ **certifications** - Professional certifications
- ✅ **contact_submissions** - Contact form entries

## Common Issues & Solutions

### Error: Access denied for user

- Check your MySQL username and password in `.env`
- Make sure the user has proper privileges

### Error: Unknown database

- Make sure you created the database: `CREATE DATABASE portfolio_db;`

### Error: Connection refused

- Ensure MySQL service is running
- Check the port (default is 3306)

### Error: Client does not support authentication protocol

Run this in MySQL:

```sql
ALTER USER 'portfolio_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

## Alternative: Using PlanetScale (Cloud MySQL)

If you prefer cloud hosting:

1. Sign up at https://planetscale.com (free tier available)
2. Create a new database
3. Get connection string and add to `.env`:
   ```env
   DATABASE_URL="mysql://user:pass@host/dbname?sslaccept=strict"
   ```

## Alternative: Using Railway

1. Sign up at https://railway.app
2. Create MySQL database
3. Copy connection string to `.env`

## Next Steps

After database setup:

1. Run development server: `npm run dev`
2. Access admin panel: http://localhost:3000/admin
3. Login with your admin credentials
4. Start adding your projects!

## Useful Commands

```bash
# Generate Prisma Client
npm run db:generate

# Push schema changes
npm run db:push

# Create migration
npm run db:migrate

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

## Need Help?

- Prisma Docs: https://www.prisma.io/docs
- MySQL Docs: https://dev.mysql.com/doc/
