FROM node:latest as base

# 1. Install dependencies only when needed
FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apt-get update
RUN apt-get install build-essential
RUN apt-get install openssl

WORKDIR /app

# 2. Rebuild the source code only when needed
FROM deps AS builder

WORKDIR /app

COPY public ./public
COPY src ./src
COPY package.json ./package.json
COPY .prettierrc.json ./.prettierrc.json
COPY next.config.js ./next.config.js
COPY tsconfig.json ./tsconfig.json
COPY tailwind.config.ts ./tailwind.config.ts

COPY prisma ./prisma

RUN corepack enable pnpm && pnpm install

# This will do the trick, use the corresponding env file for each environment.
COPY .env.template .env
RUN npm run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --gid 1001 nodejs && adduser -uid 1001 --gid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.env ./.env

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/server ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD HOSTNAME=localhost node server.js