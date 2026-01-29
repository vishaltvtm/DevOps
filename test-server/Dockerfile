# Install dependencies
FROM node:25-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production


# Final runtime image
FROM node:25-alpine
WORKDIR /appdoc
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 5000
CMD ["node", "index.js"]
