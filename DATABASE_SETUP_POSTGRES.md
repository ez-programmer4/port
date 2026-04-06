# PostgreSQL Setup and Migration

Use this guide if your old MySQL free quota expired and you want to move this portfolio to PostgreSQL.

## Recommended Providers

- Neon: https://neon.tech
- Supabase: https://supabase.com

Both provide managed PostgreSQL free tiers.

## 1. Create a New PostgreSQL Database

1. Create a project in Neon or Supabase.
2. Copy the connection string.
3. Put it in your `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
```

## 2. Confirm Prisma Provider

In [prisma/schema.prisma](prisma/schema.prisma), datasource is now:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 3. Apply Schema to the New Database

For a fresh PostgreSQL database, use `db push`:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

## 4. Verify Data

```bash
npm run db:studio
```

## 5. Production Update

Set `DATABASE_URL` in your deployment platform (for example Vercel) to the same PostgreSQL URL, then redeploy.

## Notes

- Existing migrations under [prisma/migrations](prisma/migrations) were created for MySQL and should not be reused as-is for PostgreSQL.
- For a brand-new PostgreSQL instance, `db push` is the fastest path.
