FROM node:20.15.1 AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM node:20.15.1-slim

WORKDIR /app

COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package*.json ./

ENV NODE_ENV=production

ENV PORT=3001
EXPOSE 3001

CMD ["npm", "start"]
