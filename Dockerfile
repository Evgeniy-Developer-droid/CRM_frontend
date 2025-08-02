# 1. Build stage
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install --frozen-lockfile
RUN npm run build

# 2. Production runner
FROM node:20 AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js .
# копіюй ще файли конфігів, якщо треба

EXPOSE 3000

CMD ["npm", "run", "start"]