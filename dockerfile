FROM --platform=linux/amd64 node:20-alpine AS builder

WORKDIR /app

COPY package-lock.json package-lock.json
COPY package.json package.json

RUN npm -g install @nestjs/cli@9.3.0
RUN npm install

COPY . .

RUN npm run build

FROM --platform=linux/amd64 node:20-alpine as production

WORKDIR /app

EXPOSE 3000

COPY --from=builder /app/.env .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENTRYPOINT ["node", "dist/src/main.js"]
