FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache python3 make g++

# Dependencies
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Build
FROM deps AS build
ARG NODE_OPTIONS=--max-old-space-size=2048
ARG NUXT_ENABLE_SCALAR=false
ENV NODE_OPTIONS=${NODE_OPTIONS}
ENV NUXT_ENABLE_SCALAR=${NUXT_ENABLE_SCALAR}
COPY . .
RUN npm run build

# Production image
FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache tini

COPY --from=build /app/.output ./.output

# Data directory for SQLite and uploads

ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
ENV NUXT_APP_BASE_URL=/

EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", ".output/server/index.mjs"]
