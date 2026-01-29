# 1️⃣ Install dependencies
FROM node:25-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

# 2️⃣ Build the app
FROM node:25-alpine AS build
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# 3️⃣ Production runtime
FROM node:25-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
