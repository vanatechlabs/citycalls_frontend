# syntax=docker/dockerfile:1
# ---- deps: install exact dependencies from the lockfile ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./

# The build server's network drops npm registry connections now and then:
# - prefer IPv4 (flaky IPv6 routes cause ECONNRESET / timeouts),
# - keep downloaded packages in a BuildKit cache so retries/re-deploys reuse them,
# - retry the whole install up to 3 times.
# --include=dev: build tooling (Tailwind, TypeScript) lives in devDependencies,
# and Coolify may pass NODE_ENV=production at build time, which would skip them.
# The final check fails fast if the Linux (musl) native bindings Tailwind /
# lightningcss need were skipped (npm treats them as optional).
ENV NODE_OPTIONS=--dns-result-order=ipv4first
RUN --mount=type=cache,target=/root/.npm \
    for attempt in 1 2 3; do \
      npm ci --include=dev --prefer-offline --no-audit --no-fund \
        --fetch-retries=5 --fetch-retry-mintimeout=20000 --fetch-retry-maxtimeout=120000 && break; \
      if [ "$attempt" = 3 ]; then exit 1; fi; \
      echo "npm ci failed (attempt $attempt/3), retrying in 15s..."; sleep 15; \
    done \
 && node -e "require('lightningcss'); require('@tailwindcss/oxide')"

# ---- builder: build the Next.js standalone bundle ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the browser bundle at build time, so
# they must be passed as build args (Coolify: mark the env var as a Build Variable).
ARG NEXT_PUBLIC_API_BASE_URL=https://api.citycalls.in/api/v1
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---- runner: minimal production image ----
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
