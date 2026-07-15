# 10. Deployment & Hosting Strategy

This document provides deployment guidelines for **VClick OS** on both serverless environments (Vercel) and self-hosted environments (Docker).

---

## 1. Hosting Options

### Option A: Vercel (Recommended Serverless Setup)
Deploying on Vercel leverages Next.js edge performance features:
- **Serverless Functions**: Automatically routes admin actions and pages.
- **Edge Middleware**: Handles hostname mapping and redirects at the edge, reducing latency to under 50ms.
- **Image Optimization**: Vercel's built-in image optimization handles responsive layouts.

### Option B: Docker Self-Hosted Container Setup
For enterprise self-hosting on cloud environments (e.g. Google Cloud Run, AWS ECS, DigitalOcean App Platform):

```dockerfile
# Multi-stage build for VClick OS standalone node engine
FROM node:20-alpine AS base

# Step 1: Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Step 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN npx prisma generate
RUN npm run build

# Step 3: Production runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
```

---

## 2. Environment Variables & Secret Configuration

The following variables must be configured in your environment before deployment:

| Variable Name | Required | Scope / Purpose |
| :--- | :---: | :--- |
| `DATABASE_URL` | Yes | PostgreSQL connection string (including connection pooling options) |
| `AUTH_SECRET` | Yes | 32-character string used by Auth.js for session key encryption |
| `GEMINI_API_KEY` | Yes | Google Gemini API Studio key for content generation and audits |
| `CLOUDFLARE_R2_BUCKET` | Yes | Bucket name for media assets storage |
| `CLOUDFLARE_R2_ACCESS_KEY`| Yes | Access credentials for Cloudflare R2 |
| `CLOUDFLARE_R2_SECRET_KEY`| Yes | Secret credentials for Cloudflare R2 |
| `NEXT_PUBLIC_CLARITY_ID` | No | Microsoft Clarity Tracking Project ID |

---

## 3. Database Connection Pooling & Scale Optimizations
Since VClick OS runs in serverless functions, database connections can quickly saturate the PostgreSQL pool.
- **PgBouncer Setup**:
  - Connect Prisma through a PgBouncer instance (using `pgbouncer=true` parameter in `DATABASE_URL`).
  - Optimize the connection pool size inside Prisma client configurations.
- **Client Cache**:
  - Re-use the Prisma Client connection across execution cycles as specified in `src/lib/db.ts` to prevent connection leaks.

---

## 4. Database Backup & Disaster Recovery

A daily cron job exports and compresses the PostgreSQL database to secure offsite storage (S3/R2):

```bash
#!/bin/sh
# Daily PostgreSQL database backup script for VClick OS
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/tmp/backups"
FILE_NAME="vclick_os_backup_${TIMESTAMP}.sql.gz"
S3_PATH="s3://vclick-os-backups/database/${FILE_NAME}"

mkdir -p ${BACKUP_DIR}

# Export and compress PostgreSQL tables
pg_dump ${DATABASE_URL} | gzip > ${BACKUP_DIR}/${FILE_NAME}

# Upload to S3/R2 bucket using AWS CLI
aws s3 cp ${BACKUP_DIR}/${FILE_NAME} ${S3_PATH} --endpoint-url https://${CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com

# Purge local temp files
rm -rf ${BACKUP_DIR}
```
Backup verification should be performed quarterly by restoring the compressed file to a staging database environment.
